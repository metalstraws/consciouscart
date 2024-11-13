import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar } from '../../components/ui/SearchBar';
import { ProductCard } from '../../components/product/ProductCard';
import { useProduct } from '../../hooks/useProduct';
import { styles } from './styles';
import { theme } from '../../constants/theme';
import { CameraView, Camera } from "expo-camera";
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const { product, loading, error, getProduct } = useProduct();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    }

    getCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  };

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

      <View style={styles.content}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          onSubmit={handleSearch}
        />
        <View style={styles.cameraContainer}>
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["ean13"],
            }}
            style={styles.cameraContainer}
          />
        {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
        )}
        </View>

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
      </View>
    </SafeAreaView>
  );
}