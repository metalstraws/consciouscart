import { ApiResponse, Product } from './types';

export const fetchProduct = async (barcode: string): Promise<Product | null> => {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'ConsciousCart/1.0' // OFF API recommends a user agent
        }
      }
    );

    if (!response.ok) {
      console.error(`API returned status: ${response.status}`);
      return null;
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      console.error('Response was not JSON');
      return null;
    }

    const data: ApiResponse = await response.json();
    
    if (!data || typeof data.status !== 'number') {
      console.error('Invalid API response format');
      return null;
    }

    return data.status === 1 ? data.product : null;

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