export interface Product {
  product_name: string;
  brands: string;
  packaging: string | null;
  ecoscore_score: number | null;
  stores: string[] | string | null; // Updated type to handle different possible formats
  image_url: string;
}

export interface ApiResponse {
  status: number;
  product: Product;
}