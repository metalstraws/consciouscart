export interface ProductHistoryItem {
  barcode: string;
  name: string;
  brands: string;
  ecoscore: number;
  ecograde: string;
}

export interface ProductHistoryListProps {
  products: ProductHistoryItem[];
}