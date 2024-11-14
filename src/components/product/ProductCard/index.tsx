import { View, Text, Image } from 'react-native';
import CircularProgress from '../../ui/CircularProgress';
import { styles } from './styles';
import { ProductCardProps } from './types';

export function ProductCard({ product }: ProductCardProps) {
  // Convert stores string to array if it exists, otherwise use empty array
  const storesList = product.stores 
    ? typeof product.stores === 'string'
      ? product.stores.split(',')
      : Array.isArray(product.stores)
        ? product.stores
        : []
    : [];

  const ecoScoreValue = Number(product.eco_score_value || 0);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>{product.product_name}</Text>
        <Text style={styles.value}>Brand: {product.brands || 'Unknown brand'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Packaging:</Text>
        <Text style={styles.value}>
          {Array.isArray(product.packaging) && product.packaging.length > 0 
            ? product.packaging[0] 
            : 'No packaging information available'
          }
        </Text>
      </View>

      <CircularProgress
        value={ecoScoreValue}
        duration={2500}
        strokeColorConfig={[
          { color: 'red', value: 0 },
          { color: 'orange', value: 50 },
          { color: 'green', value: 100 },
        ]}
        progressValueColor={'#000'}
      />

      <View style={styles.storesContainer}>
        <Text style={styles.label}>Available Stores:</Text>
        {storesList.length > 0 ? (
          storesList.map((store, index) => (
            <Text key={index} style={styles.store}>- {store.trim()}</Text>
          ))
        ) : (
          <Text style={styles.store}>No store information available</Text>
        )}
      </View>

      <Image 
        style={styles.image} 
        source={{ uri: product.image_url }}
        defaultSource={require('../../../../assets/images/placeholder.png')}
      />
    </View>
  );
}