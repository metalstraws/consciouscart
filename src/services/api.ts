import { Product } from './types';
import CONFIG from './config';

const API_BASE_URL = 'https://api.fais.al';
const API_KEY = CONFIG.API_KEYS.values().next().value; // Get the first API key

// Common headers used across all requests
const getHeaders = () => ({
  'Accept': 'application/json',
  'X-API-Key': `${API_KEY}`
});

export const fetchProduct = async (barcode: string): Promise<Product | null> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/product/${barcode}`,
      {
        headers: getHeaders()
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        console.log(`Product not found: ${barcode}`);
        return null;
      }
      if (response.status === 401) {
        console.error('Invalid or missing API key');
        return null;
      }
      console.error(`API returned status: ${response.status}`);
      return null;
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      console.error('Response was not JSON');
      return null;
    }

    const data = await response.json();
    return data;

  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('Invalid JSON response from API');
    } else if (error instanceof TypeError) {
      console.error('Network error occurred');
    } else {
      console.error('Error fetching product:', error);
    }
    return null;
  }
};

export const searchProducts = async (query: string, limit: number = 10): Promise<Product[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/search?q=${encodeURIComponent(query)}&limit=${Math.min(limit, CONFIG.MAX_RESULTS)}`,
      {
        headers: getHeaders()
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        console.error('Invalid or missing API key');
        return [];
      }
      console.error(`API returned status: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.products;

  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};

export const searchByBrand = async (brand: string, limit: number = 10): Promise<Product[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/brand/${encodeURIComponent(brand)}?limit=${Math.min(limit, CONFIG.MAX_RESULTS)}`,
      {
        headers: getHeaders()
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        console.error('Invalid or missing API key');
        return [];
      }
      console.error(`API returned status: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.products;

  } catch (error) {
    console.error('Error searching by brand:', error);
    return [];
  }
};

export const searchByStore = async (store: string, limit: number = 10): Promise<Product[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/store/${encodeURIComponent(store)}?limit=${Math.min(limit, CONFIG.MAX_RESULTS)}`,
      {
        headers: getHeaders()
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        console.error('Invalid or missing API key');
        return [];
      }
      console.error(`API returned status: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.products;

  } catch (error) {
    console.error('Error searching by store:', error);
    return [];
  }
};

export const checkApiHealth = async (): Promise<{
  status: string;
  dbSize: number;
  timestamp: string;
} | null> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/health`,
      {
        headers: getHeaders()
      }
    );
    
    if (!response.ok) {
      if (response.status === 401) {
        console.error('Invalid or missing API key');
        return null;
      }
      console.error(`Health check failed with status: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking API health:', error);
    return null;
  }
};