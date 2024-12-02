import React from 'react';
import { findPlaceholders } from '../utils/templateProcessor';

interface TemplateEditorProps {
  template: string;
  onTemplateChange: (template: string) => void;
  availableColumns: string[];
}

export const TemplateEditor: React.FC<TemplateEditorProps> = ({
  template,
  onTemplateChange,
  availableColumns,
}) => {
  const placeholders = findPlaceholders(template);

  return (
    <div className="w-full space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cover Letter Template
        </label>
        <textarea
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={template}
          onChange={(e) => onTemplateChange(e.target.value)}
          placeholder="Enter your cover letter template here. Use [COLUMN_NAME] as placeholders (e.g., [NAME], [COMPANY])."
        />
      </div>
      
      <div className="text-sm">
        <p className="font-medium text-gray-700 mb-2">Available Columns:</p>
        <div className="flex flex-wrap gap-2">
          {availableColumns.map((column) => (
            <span
              key={column}
              className={`px-2 py-1 rounded ${
                placeholders.includes(column)
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              [{column}]
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};