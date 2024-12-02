import React from 'react';
import { processTemplate } from '../utils/templateProcessor';
import type { CSVData } from '../types';

interface TemplatePreviewProps {
  template: string;
  sampleData: CSVData;
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  template,
  sampleData,
}) => {
  const previewText = processTemplate(template, sampleData);

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
      <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-wrap">
        {previewText}
      </div>
    </div>
  );
};