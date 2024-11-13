import { useState } from 'react';
import { Product } from '../services/types';
import { fetchProduct } from '../services/api';

export const useProduct = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProduct = async (barcode: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProduct(barcode);
      setProduct(data);
      if (!data) {
        setError('Product not found');
      }
    } catch (err) {
      setError('Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  return { product, loading, error, getProduct };
};