import React from 'react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { ResumeForm } from './components/ResumeForm';
import { FileText, Eye, Code } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = React.useState<'form' | 'code'>('form');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-500" />
              <h1 className="ml-2 text-xl font-bold">LaTeX Resume Editor</h1>
            </div>
            <div className="flex space-x-4">
              <button
                className={`flex items-center px-3 py-2 rounded-md ${
                  activeTab === 'form'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('form')}
              >
                <Eye className="h-5 w-5 mr-2" />
                Form
              </button>
              <button
                className={`flex items-center px-3 py-2 rounded-md ${
                  activeTab === 'code'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('code')}
              >
                <Code className="h-5 w-5 mr-2" />
                LaTeX
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-8rem)]">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {activeTab === 'form' ? <ResumeForm /> : <Editor />}
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Preview />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;