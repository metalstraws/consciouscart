import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, ScrollView, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function ScannedProduct() {

    const [searchText, setSearchText] = useState("");
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [productName, setProductName] = useState('');
    const [brands, setBrands] = useState('');
    const [ecoscore, setEcoscore] = useState();
    const [ecograde, setEcograde] = useState('');

    const fetchProduct = async (barcode : string) => {
      try {
        const response = await fetch(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        );
        if (response.ok){
          const data = await response.json();

          setProductName(data.product.product_name);
          setBrands(data.product.brands);
          setEcoscore(data.product.ecoscore_score);
          setEcograde(data.product.ecoscore_grade);

          console.log('name: ', data.product.product_name);
          console.log('brands: ', data.product.brands);
          console.log('eco-score: ', data.product.ecoscore_score);
          console.log('eco-grade: ', data.product.ecoscore_grade);
          // Navigate to product screen with the product data
          //navigation.navigate('Product', { product: data.product });
        } else {
          console.log('Product not found');
        };
      } catch (error) {
        console.error('Error fetching product:', error);
      };
    };
  
    // Define a function that retrieves the recent searches saved in local device
    const getHistory = async () => {
      try {
        // Get previous search history
        const history = await AsyncStorage.getItem('arrayOfSearches');
  
        // Assuming that the previous history was successfully retrieved,
        //  turn it in to an array
        const historyArray = history 
        ? JSON.parse(history) : [];
  
        // Set the state of the searchHistory to this array of previous searches
        setSearchHistory(historyArray);
  
        // Return historyArray to be used when this function is called back in storeHistory()
        return historyArray;
  
      } catch (error) {
        console.log('No search history from previous session', error);
      }
    };
  
    // Define a function that stores recent searches from search bar
    const storeHistory = async (searchedString: string) => {
        try {
          
          // Call getHistory to first retrieve the array of previous searches
          const historyArray = await getHistory();
  
          // Append the new search to the array
          const updatedArray = [...historyArray, searchedString];
          console.log('updatedArray (with recent search item): ', updatedArray);
  
          // Update the state for searchHistory to be later implemented in the UI
          setSearchHistory(updatedArray);
  
          // Turn the updated array back in to string
          const result = JSON.stringify(updatedArray);
  
          // Update the storage in AsyncStorage
          await AsyncStorage.setItem('arrayOfSearches', result);
  
          // Update the state of search text so that it clears the search bar for better UX
          setSearchText('');
        }
        catch (error){
          console.log('search not saved:', error);
        };
    };
  
    // Define a function that clears all search history
    const clearHistory = async function () {
      try {
        await AsyncStorage.removeItem('arrayOfSearches');
        console.log('All data cleared');
        setSearchText('');
      
        setSearchHistory([]);
  
      } catch (error) {
        console.error('Failed to clear AsyncStorage: ', error);
      }
    };
  
  
    return (
      <View>
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
            placeholder="Search..."
            value={searchText}
            onChangeText={setSearchText}
            clearButtonMode="always" // iOS only
          />
        </View>
        <View>
          <Button title = "Search" onPress = {() => {storeHistory(searchText)}} />
        </View>
        <View>
          <Button title = "Clear searches" onPress = {() => {clearHistory()}} />
        </View>

        <ScrollView>
          {searchHistory.length === 0 ? (
            <Text>No search history available.</Text>
          ) : (
            searchHistory.map((code) => (
              <View style={{ margin: 10 }}>
                <Text style={{ color: 'orange', fontSize: 18 }}>
                  {code}
                  
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      
      </View>
    );
};

// const Box = (props) => {
//   return (
//     <View style={{ backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', padding: 5, marginBottom: 5 }}>
//       <Text style={{ color: 'orange', fontSize: 18 }}>
//         {props.label}
//       </Text>
//     </View>
//   );
// };

const styles = StyleSheet.create({
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
      borderRadius: 10,
      padding: 10,
      marginHorizontal: 10,
      marginVertical: 8,
    },
    searchInput: {
      flex: 1,
      marginLeft: 10,
      fontSize: 16,
    },
  });

  // console.log('result from fetchProduct: ', fetchProduct('8445290728791'));


//   <View>
//   <Text style={{ color: 'orange', fontSize: 18 }}>
//     Product name: {productName}
//   </Text>
// </View>
// <View>
//   <Text style={{ color: 'orange', fontSize: 18 }}>
//     Brands: {brands}
//   </Text>
// </View>
// <View>
//   <Text style={{ color: 'orange', fontSize: 18 }}>
//     Eco score: {ecoscore}
//   </Text>
// </View>
// <View>
//   <Text style={{ color: 'orange', fontSize: 18 }}>
//     Eco grade: {ecograde}
//   </Text>
// </View>