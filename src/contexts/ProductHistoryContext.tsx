import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../services/types';
import { ProductHistoryItem } from '../components/product/ProductHistoryList/types';

interface ProductHistoryContextType {
  products: ProductHistoryItem[];
  loading: boolean;
  addProduct: (barcode: string, product: Product) => Promise<void>;
  clearProducts: () => Promise<void>;
  refreshProducts: () => Promise<void>;
}

const STORAGE_KEY = 'product_history';
const MAX_HISTORY_ITEMS = 50;

const ProductHistoryContext = createContext<ProductHistoryContextType | undefined>(undefined);

export function ProductHistoryProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<ProductHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      console.log('DEBUG: Loading products from storage:', stored);
      if (stored) {
        setProducts(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = async (barcode: string, product: Product) => {
    try {
      console.log('Adding product:', barcode, product);
      
      const historyItem: ProductHistoryItem = {
        barcode,
        name: product.product_name,
        brands: product.brands,
        eco_score_value: product.eco_score_value ?? 0,
        eco_score_grade: product.eco_score_grade ?? 'n/a',
      };
      
      const newProducts = [historyItem, ...products.filter(p => p.barcode !== barcode)].slice(0, MAX_HISTORY_ITEMS);
      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
      console.log('Saved products to storage');
      
      setProducts(newProducts);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const clearProducts = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setProducts([]);
      console.log('Cleared all products');
    } catch (error) {
      console.error('Failed to clear products:', error);
    }
  };

  return (
    <ProductHistoryContext.Provider 
      value={{ 
        products, 
        loading, 
        addProduct, 
        clearProducts,
        refreshProducts: loadProducts
      }}
    >
      {children}
    </ProductHistoryContext.Provider>
  );
}

export function useProductHistory() {
  const context = useContext(ProductHistoryContext);
  if (context === undefined) {
    throw new Error('useProductHistory must be used within a ProductHistoryProvider');
  }
  return context;
}