import { Editor as MonacoEditor } from '@monaco-editor/react';
import { useResumeStore } from '../store/useResumeStore';
import { FileUpload } from './FileUpload';
import { CompileButton } from './CompileButton';

export function Editor() {
  const { latexTemplate, updateLatexTemplate } = useResumeStore();

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <FileUpload />
        <CompileButton />
      </div>
      <div className="flex-1">
        <MonacoEditor
          height="100%"
          defaultLanguage="latex"
          value={latexTemplate}
          onChange={(value) => updateLatexTemplate(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
  );
}