import { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  CameraView,
  Camera,
  BarcodeScanningResult,
  PermissionResponse,
} from "expo-camera";

import { SearchBar } from "../../components/ui/SearchBar";
import { ProductCard } from "../../components/product/ProductCard";
import { useProduct } from "../../hooks/useProduct";
import { useProductHistory } from "../../hooks/useProductHistory";
import { styles } from "./styles";
import { theme } from "../../constants/theme";
import {
  useFonts,
  SourceSerifPro_600SemiBold,
} from "@expo-google-fonts/source-serif-pro";
import * as SplashScreen from "expo-splash-screen";
import { Header } from "../../components/ui/Header";
import { fetchProduct } from '../../services/api';


SplashScreen.preventAutoHideAsync();

export function HomeScreen() {
  const [fontsLoaded] = useFonts({
    SourceSerifPro_600SemiBold,
  });

  const [searchText, setSearchText] = useState("");
  const { product, loading, error, getProduct } = useProduct();
  const { addProduct } = useProductHistory();
  const [cameraPermission, setCameraPermission] = useState<PermissionResponse>();
  const [showCamera, setShowCamera] = useState(false);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        // Wait for fonts + artificial delay
        await new Promise((resolve) => setTimeout(resolve, 3000));

        if (fontsLoaded) {
          // Hide splash screen once fonts are loaded
          await SplashScreen.hideAsync();
        }
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, [fontsLoaded]);

  const requestCameraPermission = async () => {
    try {
      const permission = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(permission);
    } catch (err) {
      console.error("Failed to request camera permission:", err);
    }
  };

  const handleBarCodeScanned = async (result: BarcodeScanningResult) => {
    if (!isScanning) return;
  
    setIsScanning(false);
    setShowCamera(false);
    
    try {
      console.log("DEBUG: Before scanning product:", result.data);
      const data = await fetchProduct(result.data);
      console.log("DEBUG: Scan API Response:", data);
      
      if (data) {
        await getProduct(result.data); // This will update the UI
        await addProduct(result.data, data); // Use data directly from API
      }
    } catch (err) {
      console.error("Scan error:", err);
    }
  };

  const handleSearch = async () => {
    const trimmedText = searchText.trim();
    if (trimmedText) {
      try {
        console.log("DEBUG: Before getProduct:", trimmedText);
        const data = await fetchProduct(trimmedText);
        console.log("DEBUG: API Response:", data);
        
        if (data) {
          await getProduct(trimmedText); // This will update the UI
          console.log("DEBUG: Before addProduct");
          await addProduct(trimmedText, data); // Use data directly from API
          console.log("DEBUG: After addProduct");
          setSearchText('');
        }
      } catch (err) {
        console.error("Search error:", err);
      }
    }
  };

  const handleShowCamera = () => {
    setShowCamera(true);
    setIsScanning(true);
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
    setIsScanning(true);
  };

  const renderCameraPermissionStatus = () => {
    if (!cameraPermission) {
      return <Text>Requesting camera permission...</Text>;
    }

    if (!cameraPermission.granted) {
      return (
        <View style={styles.loadingContainer}>
          <Text>No access to camera</Text>
          <Button
            title="Request Permission"
            onPress={requestCameraPermission}
          />
        </View>
      );
    }

    return null;
  };

  const permissionStatus = renderCameraPermissionStatus();
  if (permissionStatus) return permissionStatus;

  if (!fontsLoaded || !cameraPermission) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.primary}
        translucent={true}
        barStyle="light-content"
      />

      <Header onScanPress={handleShowCamera} />

      <View style={styles.content}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          onSubmit={handleSearch}
        />

        {showCamera ? (
          <View style={styles.cameraContainer}>
            <CameraView
              onBarcodeScanned={isScanning ? handleBarCodeScanned : undefined}
              barcodeScannerSettings={{
                barcodeTypes: ["ean13"],
              }}
              style={styles.camera}
            />
            {!isScanning && (
              <Button title="Scan Again" onPress={() => setIsScanning(true)} />
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseCamera}
            >
              <Ionicons
                name="close-circle"
                size={40}
                color={theme.colors.surface}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <>
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
          </>
        )}
      </View>
    </SafeAreaView>
  );
}