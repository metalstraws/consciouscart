import { Product, ApiResponse } from './types';
import CONFIG from './config';

const API_BASE_URL = 'https://api.fais.al';
const OFF_API_URL = 'https://world.openfoodfacts.org/api/v2';
const API_KEY = CONFIG.API_KEYS.values().next().value;
const OFF_TIMEOUT = 3000;

const headers: Record<string, string> = {
  'Accept': 'application/json',
  'X-API-Key': API_KEY || ''
};

const makeRequest = (url: string, customHeaders?: Record<string, string>): RequestInit => ({
  headers: customHeaders ?? headers
});

const convertOFFProduct = (offProduct: any): Product => ({
  barcode: offProduct.code,
  product_name: offProduct.product_name || '',
  brands: offProduct.brands || '',
  packaging: offProduct.packaging || null,
  eco_score_grade: offProduct.ecoscore_grade || null,
  eco_score_value: offProduct.ecoscore_score || null,
  stores: offProduct.stores ? offProduct.stores.split(',').map((s: string) => s.trim()) : null,
  image_url: offProduct.image_url || ''
});

const fetchWithTimeout = async (url: string): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), OFF_TIMEOUT);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export const fetchProduct = async (barcode: string): Promise<Product | null> => {
  try {
    const response = await fetchWithTimeout(`${OFF_API_URL}/product/${barcode}.json`);
    if (response.ok) {
      const data = await response.json();
      if (data.status === 1) return convertOFFProduct(data.product);
    }
  } catch (error) {
    console.log('OpenFoodFacts timed out, trying primary API');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/product/${barcode}`, makeRequest(API_BASE_URL));
      if (response.ok) return (await response.json() as ApiResponse).product;
    } catch (error) {
      console.error('Error fetching from primary API:', error);
    }
  }

  return null;
};

export const searchProducts = async (query: string, limit: number = 10): Promise<Product[]> => {
  try {
    const response = await fetchWithTimeout(
      `${OFF_API_URL}/search?search_terms=${encodeURIComponent(query)}&page_size=${limit}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.products.map(convertOFFProduct);
    }
  } catch (error) {
    console.log('OpenFoodFacts timed out, trying primary API');
    
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/search?q=${encodeURIComponent(query)}&limit=${Math.min(limit, CONFIG.MAX_RESULTS)}`,
        makeRequest(API_BASE_URL)
      );
      if (response.ok) return (await response.json()).products;
    } catch (error) {
      console.error('Error searching primary API:', error);
    }
  }

  return [];
};

export const searchByBrand = async (brand: string, limit: number = 10): Promise<Product[]> => {
  try {
    const response = await fetchWithTimeout(
      `${OFF_API_URL}/search?brands=${encodeURIComponent(brand)}&page_size=${limit}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.products.map(convertOFFProduct);
    }
  } catch (error) {
    console.log('OpenFoodFacts timed out, trying primary API');
    
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/brand/${encodeURIComponent(brand)}?limit=${Math.min(limit, CONFIG.MAX_RESULTS)}`,
        makeRequest(API_BASE_URL)
      );
      if (response.ok) return (await response.json()).products;
    } catch (error) {
      console.error('Error searching primary API by brand:', error);
    }
  }

  return [];
};

export const searchByStore = async (store: string, limit: number = 10): Promise<Product[]> => {
  try {
    const response = await fetchWithTimeout(
      `${OFF_API_URL}/search?stores=${encodeURIComponent(store)}&page_size=${limit}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.products.map(convertOFFProduct);
    }
  } catch (error) {
    console.log('OpenFoodFacts timed out, trying primary API');
    
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/store/${encodeURIComponent(store)}?limit=${Math.min(limit, CONFIG.MAX_RESULTS)}`,
        makeRequest(API_BASE_URL)
      );
      if (response.ok) return (await response.json()).products;
    } catch (error) {
      console.error('Error searching primary API by store:', error);
    }
  }

  return [];
};

export const checkApiHealth = async (): Promise<{ status: string; dbSize: number; timestamp: string; } | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, makeRequest(API_BASE_URL));
    return response.ok ? await response.json() : null;
  } catch (error) {
    console.error('Error checking API health:', error);
    return null;
  }
};