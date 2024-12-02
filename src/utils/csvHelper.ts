export const validateCSVData = (data: any[]): CSVData[] => {
  return data
    .map(row => {
      const processedRow: CSVData = {};
      Object.entries(row).forEach(([key, value]) => {
        if (value) {
          processedRow[key.trim()] = String(value).trim();
        }
      });
      return processedRow;
    })
    .filter(row => Object.keys(row).length > 0);
};