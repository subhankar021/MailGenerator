export const findPlaceholders = (template: string): string[] => {
  const regex = /\[([^\]]+)\]/g;
  const matches = template.match(regex) || [];
  return [...new Set(matches.map(match => match.slice(1, -1)))];
};

export const processTemplate = (template: string, rowData: CSVData): string => {
  let processedContent = template;
  const placeholders = findPlaceholders(template);
  
  placeholders.forEach(placeholder => {
    const value = rowData[placeholder] || `[${placeholder}]`;
    const regex = new RegExp(`\\[${placeholder}\\]`, 'gi');
    processedContent = processedContent.replace(regex, value);
  });
  
  return processedContent;
};

export const downloadFile = (content: string, fileName: string) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};