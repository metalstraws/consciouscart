import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './styles';
import type { ProductHistoryListProps } from './types';

export function ProductHistoryList({ products }: ProductHistoryListProps) {
  if (products.length === 0) {
    return <Text style={styles.emptyText}>No search history available.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {products.map((product, index) => (
        <View key={`${product.barcode}-${index}`} style={styles.productCard}>
          <View>
            <Text style={styles.label}>Product name:</Text>
            <Text style={styles.value}>{product.name}</Text>
          </View>
          <View>
            <Text style={styles.label}>Brands:</Text>
            <Text style={styles.value}>{product.brands}</Text>
          </View>
          <View>
            <Text style={styles.label}>Ecoscore:</Text>
            <Text style={styles.value}>{product.ecoscore}</Text>
          </View>
          <View>
            <Text style={styles.label}>Ecograde:</Text>
            <Text style={styles.value}>{product.ecograde}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}