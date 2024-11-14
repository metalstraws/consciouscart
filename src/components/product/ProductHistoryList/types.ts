export interface ProductHistoryItem {
  barcode: string;
  name: string;
  brands: string;
  eco_score_value: number;
  eco_score_grade: string;
}

export interface ProductHistoryListProps {
  products: ProductHistoryItem[];
}