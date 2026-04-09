export interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  content: string[];
  type: 'info' | 'list' | 'table' | 'highlight' | 'form';
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  formId?: string;
  icon?: string;
}
