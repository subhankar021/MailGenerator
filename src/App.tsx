import React, { useState } from 'react';
import Papa from 'papaparse';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FileUpload } from './components/FileUpload';
import { TemplateEditor } from './components/TemplateEditor';
import { TemplatePreview } from './components/TemplatePreview';
import { processTemplate, downloadFile } from './utils/templateProcessor';
import { validateCSVData } from './utils/csvHelper';
import { FileText, Download, AlertCircle, RotateCw } from 'lucide-react';
import type { CSVData, GeneratedLetter } from './types';

function App() {
  const [csvData, setCSVData] = useState<CSVData[]>([]);
  const [template, setTemplate] = useState<string>(
    'Dear [NAME],\n\nI am writing to express my interest in the position at [COMPANY]...'
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [generatedLetter, setGeneratedLetter] = useState<GeneratedLetter | null>(null);
  const [error, setError] = useState<string>('');
  const [availableColumns, setAvailableColumns] = useState<string[]>([]);

  const handleCSVUpload = (file: File) => {
    setError('');
    setGeneratedLetter(null);
    setCurrentIndex(0);
    
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const headers = results.meta.fields || [];
        const processedData = validateCSVData(results.data);
        
        if (processedData.length === 0) {
          setError('No valid data found in the CSV file');
          setCSVData([]);
          return;
        }

        setAvailableColumns(headers);
        setCSVData(processedData);
      },
      error: (error) => {
        setError(`Error parsing CSV: ${error.message}`);
        setCSVData([]);
      }
    });
  };

  const handleTemplateFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setTemplate(e.target.result as string);
      }
    };
    reader.readAsText(file);
  };

  const generateLetter = () => {
    if (csvData.length === 0) return;
    
    const rowData = csvData[currentIndex];
    const content = processTemplate(template, rowData);
    
    setGeneratedLetter({ content, rowData });
    setCurrentIndex((prev) => (prev + 1) % csvData.length);
  };

  const handleDownload = () => {
    if (!generatedLetter) return;
    
    const fileName = `cover-letter-${Object.values(generatedLetter.rowData).join('-')}.txt`;
    downloadFile(generatedLetter.content, fileName);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <FileText className="mr-2" />
              Cover Letter Generator
            </h1>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
                <AlertCircle className="mr-2" />
                {error}
              </div>
            )}

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">1. Upload CSV File</h2>
                <FileUpload
                  onFileSelect={handleCSVUpload}
                  accept=".csv"
                  label="Upload CSV file with data"
                />
                {csvData.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      ✓ Loaded {csvData.length} records
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">
                  2. Provide Cover Letter Template
                </h2>
                <div className="space-y-4">
                  <TemplateEditor
                    template={template}
                    onTemplateChange={setTemplate}
                    availableColumns={availableColumns}
                  />
                  {template && csvData.length > 0 && (
                    <TemplatePreview
                      template={template}
                      sampleData={csvData[0]}
                    />
                  )}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">or</span>
                    </div>
                  </div>
                  <FileUpload
                    onFileSelect={handleTemplateFileUpload}
                    accept=".txt"
                    label="Upload template file"
                  />
                </div>
              </div>

              {generatedLetter && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Generated Letter:</h3>
                  <div className="whitespace-pre-wrap mb-4">
                    {generatedLetter.content}
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={generateLetter}
                  disabled={!csvData.length || !template}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <RotateCw className="mr-2" />
                  Generate Next Letter
                </button>

                <button
                  onClick={handleDownload}
                  disabled={!generatedLetter}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Download className="mr-2" />
                  Download Letter
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;