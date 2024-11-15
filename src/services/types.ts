export interface Product {
  barcode: string,
  product_name: string;
  brands: string;
  packaging: string | null;
  eco_score_grade: string | null;
  eco_score_value: number | null;
  stores: string[] | string | null; // Updated type to handle different possible formats
  image_url: string;
}

export interface ApiResponse {
  status: number;
  product: Product;
}