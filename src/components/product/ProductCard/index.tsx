import { View, Text, Image } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
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

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>{product.product_name}</Text>
        <Text>Brand: {product.brands}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Packaging:</Text>
        <Text>{product.packaging || 'No packaging information available'}</Text>
      </View>

      <CircularProgress
        value={Number(product.ecoscore_score || 0)}
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
        defaultSource={require('../../../../assets/images/placeholder.png')} // Add a placeholder image
      />
    </View>
  );
}