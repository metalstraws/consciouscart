import React, { useState } from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar } from '../../components/ui/SearchBar';
import { ProductHistoryList } from '../../components/product/ProductHistoryList';
import { useProductHistory } from '../../hooks/useProductHistory';
import { styles } from './styles';
import { theme } from '../../constants/theme';


export function ScanHistoryScreen() {
  const [searchText, setSearchText] = useState('');
  const { productDetails, loading, addToHistory, clearHistory } = useProductHistory();

  const handleSearch = () => {
    if (searchText.trim()) {
      addToHistory(searchText);
      setSearchText('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scan History</Text>
        <Ionicons name="list" size={24} color="black" />
      </View>

      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        onSubmit={handleSearch}
        placeholder="Enter barcode to save..."
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading history...</Text>
        </View>
      ) : (
        <>
          <ProductHistoryList products={productDetails} />
          {productDetails.length > 0 && (
            <View style={styles.clearButtonContainer}>
              <Button 
                onPress={clearHistory}
                title="Clear History"
                color={theme.colors.error}
              />
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}