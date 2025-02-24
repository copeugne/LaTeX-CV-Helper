import React, { useRef, useState } from 'react';
import { Upload, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';

interface UploadStatus {
  type: 'success' | 'error' | 'loading' | null;
  message: string;
}

export function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<UploadStatus>({ type: null, message: '' });
  const [uploadProgress, setUploadProgress] = useState(0);
  const updateLatexTemplate = useResumeStore((state) => state.updateLatexTemplate);

  const validateLatex = (content: string): boolean => {
    // Basic LaTeX validation
    const requiredCommands = [
      '\\documentclass',
      '\\begin{document}',
      '\\end{document}'
    ];
    return requiredCommands.every(cmd => content.includes(cmd));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    setStatus({ type: 'loading', message: 'Processing file...' });
    setUploadProgress(0);

    const file = files[0];
    if (!file.name.endsWith('.tex')) {
      setStatus({ type: 'error', message: 'Please upload a .tex file' });
      return;
    }

    try {
      const reader = new FileReader();
      
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(progress);
        }
      };

      reader.onload = async (e) => {
        const content = e.target?.result as string;
        
        if (!validateLatex(content)) {
          setStatus({ type: 'error', message: 'Invalid LaTeX file format' });
          return;
        }

        updateLatexTemplate(content);
        setStatus({ type: 'success', message: 'File uploaded successfully' });
        setTimeout(() => setStatus({ type: null, message: '' }), 3000);
      };

      reader.onerror = () => {
        setStatus({ type: 'error', message: 'Error reading file' });
      };

      reader.readAsText(file);
    } catch (error) {
      setStatus({ type: 'error', message: 'Error processing file' });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files?.length && fileInputRef.current) {
      fileInputRef.current.files = files;
      handleFileUpload({ target: { files } } as any);
    }
  };

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept=".tex"
        multiple={false}
        className="hidden"
        onChange={handleFileUpload}
        aria-label="Upload LaTeX file"
      />
      
      <div
        className="relative"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          title="Upload a LaTeX (.tex) file"
          disabled={status.type === 'loading'}
        >
          {status.type === 'loading' ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Upload className="w-5 h-5" />
          )}
          Upload LaTeX
        </button>

        {status.type && (
          <div
            className={`absolute top-full mt-2 left-0 right-0 p-3 rounded-md ${
              status.type === 'success'
                ? 'bg-green-50 text-green-800'
                : status.type === 'error'
                ? 'bg-red-50 text-red-800'
                : 'bg-blue-50 text-blue-800'
            }`}
          >
            <div className="flex items-center gap-2">
              {status.type === 'success' && <CheckCircle className="w-5 h-5" />}
              {status.type === 'error' && <AlertCircle className="w-5 h-5" />}
              {status.type === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
              <span>{status.message}</span>
            </div>
            {status.type === 'loading' && uploadProgress > 0 && (
              <div className="mt-2 h-2 bg-blue-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-2 text-sm text-gray-500">
        Drag and drop a .tex file here or click to browse
      </div>
    </div>
  );
}