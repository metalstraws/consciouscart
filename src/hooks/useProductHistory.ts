import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ProductHistoryItem } from '../components/product/ProductHistoryList/types';
import type { Product } from '../services/types';
import { fetchProduct } from '../services/api';

interface ProductHistoryHook {
  productDetails: ProductHistoryItem[];
  loading: boolean;
  addToHistory: (barcode: string) => Promise<boolean>;
  clearHistory: () => Promise<boolean>;
}

const mapProductToHistoryItem = (product: Product, barcode: string): ProductHistoryItem => ({
  barcode,
  name: product.product_name,
  brands: product.brands,
  ecoscore: product.ecoscore_score ?? 0,
  ecograde: getEcoGrade(product.ecoscore_score)
});

const getEcoGrade = (score: number | null): string => {
  if (score === null) return 'unknown';
  if (score >= 80) return 'A';
  if (score >= 60) return 'B';
  if (score >= 40) return 'C';
  if (score >= 20) return 'D';
  return 'E';
};

export function useProductHistory(): ProductHistoryHook {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [productDetails, setProductDetails] = useState<ProductHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const getHistory = async (): Promise<string[]> => {
    try {
      const history = await AsyncStorage.getItem('arrayOfSearches');
      const historyArray = history ? JSON.parse(history) : [];
      setSearchHistory(historyArray);
      return historyArray;
    } catch (error) {
      console.error('Error loading search history:', error);
      return [];
    }
  };

  const fetchAllProducts = async (): Promise<void> => {
    setLoading(true);
    try {
      const historyArray = await getHistory();
      const productPromises = historyArray.map(async (barcode) => {
        const product = await fetchProduct(barcode);
        if (product) {
          return mapProductToHistoryItem(product, barcode);
        }
        return null;
      });

      const results = await Promise.all(productPromises);
      const validProducts = results.filter((product): product is ProductHistoryItem => product !== null);
      
      setProductDetails(validProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToHistory = async (barcode: string): Promise<boolean> => {
    try {
      const historyArray = await getHistory();
      if (historyArray.includes(barcode)) {
        return true;
      }
      
      const updatedArray = [...historyArray, barcode];
      await AsyncStorage.setItem('arrayOfSearches', JSON.stringify(updatedArray));
      setSearchHistory(updatedArray);

      const product = await fetchProduct(barcode);
      if (product) {
        const newProduct = mapProductToHistoryItem(product, barcode);
        setProductDetails(prev => [...prev, newProduct]);
      }
      return true;
    } catch (error) {
      console.error('Error adding to history:', error);
      return false;
    }
  };

  const clearHistory = async (): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem('arrayOfSearches');
      setSearchHistory([]);
      setProductDetails([]);
      return true;
    } catch (error) {
      console.error('Error clearing history:', error);
      return false;
    }
  };

  useEffect(() => {
    void fetchAllProducts();
  }, []);

  return {
    productDetails,
    loading,
    addToHistory,
    clearHistory
  };
}