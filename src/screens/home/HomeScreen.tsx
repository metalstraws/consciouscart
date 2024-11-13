import { useState } from 'react';
import { ScrollView, View, Text, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar } from '../../components/ui/SearchBar';
import { ProductCard } from '../../components/product/ProductCard';
import { useProduct } from '../../hooks/useProduct';
import { styles } from './styles';
import { theme } from '../../constants/theme';

export function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const { product, loading, error, getProduct } = useProduct();

  const handleSearch = () => {
    if (searchText) {
      getProduct(searchText);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Conscious Cart</Text>
        <Ionicons name="cart" size={40} color={theme.colors.surface} />
      </View>

      <ScrollView style={styles.content}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          onSubmit={handleSearch}
        />

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text>Loading...</Text>
          </View>
        ) : error ? (
          <View style={styles.loadingContainer}>
            <Text>{error}</Text>
          </View>
        ) : product ? (
          <ProductCard product={product} />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}