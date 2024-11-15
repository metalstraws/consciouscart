import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../services/types';
import { ProductHistoryItem } from '../components/product/ProductHistoryList/types';

interface UseProductHistoryReturn {
  products: ProductHistoryItem[];
  loading: boolean;
  addProduct: (barcode: string, product: Product) => Promise<void>;
  clearProducts: () => Promise<void>;
}

const STORAGE_KEY = 'product_history';
const MAX_HISTORY_ITEMS = 50;

export function useProductHistory(): UseProductHistoryReturn {
  const [products, setProducts] = useState<ProductHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      console.log('DEBUG: Current storage content:', stored);
      if (stored) {
        const parsedProducts = JSON.parse(stored);
        console.log('DEBUG: Parsed products:', parsedProducts);
        setProducts(parsedProducts);
        console.log('DEBUG: State updated with products');
      } else {
        console.log('DEBUG: No products in storage');
      }
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (barcode: string, product: Product) => {
    try {
      console.log('DEBUG: addProduct called with:', { barcode, product });
      
      const historyItem: ProductHistoryItem = {
        barcode,
        name: product.product_name,
        brands: product.brands,
        eco_score_value: product.eco_score_value ?? 0,
        eco_score_grade: product.eco_score_grade ?? 'n/a',
      };

      // Get current products directly from storage
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      console.log('DEBUG: Current storage before update:', stored);
      const currentProducts: ProductHistoryItem[] = stored ? JSON.parse(stored) : [];
      
      // Remove existing product with same barcode
      const filteredProducts = currentProducts.filter(p => p.barcode !== barcode);
      
      // Add new product at the beginning
      const newProducts = [historyItem, ...filteredProducts].slice(0, MAX_HISTORY_ITEMS);
      
      // Save to AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
      console.log('DEBUG: Saved new products to storage:', JSON.stringify(newProducts));
      
      // Update state
      setProducts(newProducts);
      console.log('DEBUG: Updated state with new products');
      
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const debugStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log('DEBUG: All AsyncStorage keys:', keys);
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      console.log('DEBUG: Current storage content:', stored);
    } catch (error) {
      console.error('Debug storage error:', error);
    }
  };

  const clearProducts = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setProducts([]);
      console.log('Cleared all products'); // Debug log
    } catch (error) {
      console.error('Failed to clear products:', error);
    }
  };

  // Call debugStorage whenever products state changes
  useEffect(() => {
    debugStorage();
  }, [products]);

  return {
    products,
    loading,
    addProduct,
    clearProducts
  };
}