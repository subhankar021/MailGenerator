export interface CoverLetterTemplate {
  content: string;
}

export interface CSVData {
  [key: string]: string;
}

export interface GeneratedLetter {
  content: string;
  rowData: CSVData;
}