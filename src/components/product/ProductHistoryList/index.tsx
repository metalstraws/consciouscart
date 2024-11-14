import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './styles';
import type { ProductHistoryListProps } from './types';

const getEcoGradeInfo = (grade: string | null) => {
  if (!grade) return { emoji: '❓', label: 'UNKNOWN', color: '#808080' };
  
  const gradeMap: Record<string, { emoji: string; color: string }> = {
    'a': { emoji: '🌟', color: '#1f7a1f' },    // Dark green
    'b': { emoji: '👍', color: '#4CAF50' },    // Green
    'c': { emoji: '👌', color: '#FFA500' },    // Orange
    'd': { emoji: '⚠️', color: '#FF6B6B' },    // Light red
    'e': { emoji: '👎', color: '#dc3545' },    // Red
  };

  const normalizedGrade = grade.toLowerCase();
  const gradeInfo = gradeMap[normalizedGrade] || { emoji: '❓', color: '#808080' };

  return {
    emoji: gradeInfo.emoji,
    label: grade.toUpperCase(),
    color: gradeInfo.color,
  };
};

const formatValue = (value: string | number | null): string => {
  if (value === null || value === undefined) return 'Not available';
  return String(value);
};

export function ProductHistoryList({ products }: ProductHistoryListProps) {
  if (!Array.isArray(products) || products.length === 0) {
    return <Text style={styles.emptyText}>No search history available.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {products.map((product, index) => {
        const ecoGrade = getEcoGradeInfo(product.eco_score_grade);
        
        return (
          <View key={`${product.barcode}-${index}`} style={styles.productCard}>
            <View style={styles.labelValue}>
              <Text style={styles.label}>Product name:</Text>
              <Text style={styles.value}>
                {product.name?.trim() || 'Unknown product'}
              </Text>
            </View>
            <View style={styles.labelValue}>
              <Text style={styles.label}>Brands:</Text>
              <Text style={styles.value}>
                {product.brands?.trim() || 'Unknown brand'}
              </Text>
            </View>
            <View style={styles.labelValue}>
              <Text style={styles.label}>Ecoscore:</Text>
              <Text style={styles.value}>
                {formatValue(product.eco_score_value)}
              </Text>
            </View>
            <View style={styles.labelValue}>
              <Text style={styles.label}>Ecograde:</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[
                  styles.value,
                  { 
                    color: ecoGrade.color,
                    fontWeight: 'bold',
                    marginRight: 8,
                  }
                ]}>
                  {ecoGrade.label}
                </Text>
                <Text style={{ fontSize: 20 }}>{ecoGrade.emoji}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}