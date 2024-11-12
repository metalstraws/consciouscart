import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  SourceSerifPro_600SemiBold,
} from "@expo-google-fonts/source-serif-pro";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [product, setProduct] = useState(null);
  const [fontsLoaded] = useFonts({
    SourceSerifPro_600SemiBold,
  });
  if (!fontsLoaded) {
    return null;
  };


  
  const fetchProduct = async (barcode : string) => {
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      const data = await response.json();
      
      if (data.status === 1) {
        setProduct(data.product);
        console.log(product)
        // Navigate to product screen with the product data
        //navigation.navigate('Product', { product: data.product });
      } else {
        console.log('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#9bce99"}}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "SourceSerifPro_600SemiBold",
            fontSize: 32,
            textAlign: "center",
          }}
        >
          Conscious Cart
        </Text>
        <Ionicons
          style={{ marginLeft: 15 }}
          name="cart"
          size={40}
          color="#000"
        ></Ionicons>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Enter barcode..."
          value={searchText}
          onChangeText={setSearchText}
          clearButtonMode="always"
          keyboardType="numeric"
          onSubmitEditing={() => {
            console.log("Searching for barcode:", searchText);
            fetchProduct(searchText);
          }}
          returnKeyType="search"
        />
        <Ionicons name="arrow-forward" size={20} color="#666" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 8,
    width: "80%",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
});
