import { router, useFocusEffect } from 'expo-router';
import React, { useState, useCallback } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar } from '../../components/ui/SearchBar';
import { ProductHistoryList } from '../../components/product/ProductHistoryList';
import { useProductHistory } from '../../contexts/ProductHistoryContext'; // Updated import
import { useProduct } from '../../hooks/useProduct';
import { styles } from './styles';
import { theme } from '../../constants/theme';
import { Header } from '../../components/ui/Header';
import { fetchProduct } from '../../services/api';

export function ScanHistoryScreen() {
  const [searchText, setSearchText] = useState('');
  const { 
    products, 
    loading: historyLoading, 
    addProduct, 
    clearProducts,
    refreshProducts 
  } = useProductHistory();
  const { loading: productLoading, error } = useProduct();

  // Refresh products when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      refreshProducts();
    }, [])
  );

  const handleScanPress = () => {
    router.push('/(tabs)');
  };

  const handleSearch = async () => {
    const trimmedText = searchText.trim();
    if (trimmedText) {
      try {
        // Get product data directly from API
        const data = await fetchProduct(trimmedText);
        
        if (data) {
          await addProduct(trimmedText, data);
          setSearchText('');
        } else {
          Alert.alert('Product Not Found', 'Please check the barcode and try again.');
        }
      } catch (err) {
        Alert.alert('Error', 'Unable to fetch product details. Please try again.');
      }
    }
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all scan history?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear',
          onPress: async () => {
            await clearProducts();
            refreshProducts(); // Refresh after clearing
          },
          style: 'destructive'
        }
      ]
    );
  };

  const isLoading = historyLoading || productLoading;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.primary}
        translucent={true}
        barStyle="light-content"
      />
      
      <Header onScanPress={handleScanPress} />

      <View style={styles.content}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          onSubmit={handleSearch}
          placeholder="Enter barcode to save..."
        />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : error ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : (
            <>
              <ProductHistoryList products={products} />
              {products.length > 0 && (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={handleClearHistory}
                >
                  <Ionicons name="trash-outline" size={20} color={theme.colors.surface} />
                  <Text style={styles.clearButtonText}>Clear History</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}