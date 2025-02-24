import React, { useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';
import { compile } from '../utils/latex';

export function CompileButton() {
  const {
    resume,
    latexTemplate,
    isCompiling,
    compilationError,
    setCompiling,
    setCompilationError,
  } = useResumeStore();

  const handleCompile = useCallback(async () => {
    if (isCompiling) return;

    setCompiling(true);
    setCompilationError(null);

    try {
      await compile(latexTemplate, resume);
      // Success notification will be handled by the Preview component
    } catch (error) {
      setCompilationError(error instanceof Error ? error.message : 'Compilation failed');
    } finally {
      setCompiling(false);
    }
  }, [latexTemplate, resume, isCompiling, setCompiling, setCompilationError]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        handleCompile();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleCompile]);

  return (
    <div className="relative">
      <button
        onClick={handleCompile}
        disabled={isCompiling}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isCompiling
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white`}
        title="Compile LaTeX (Ctrl/Cmd + R)"
      >
        <RefreshCw className={`w-5 h-5 ${isCompiling ? 'animate-spin' : ''}`} />
        {isCompiling ? 'Compiling...' : 'Compile'}
      </button>

      {compilationError && (
        <div className="absolute top-full mt-2 left-0 right-0 p-3 bg-red-50 text-red-800 rounded-md">
          {compilationError}
        </div>
      )}
    </div>
  );
}