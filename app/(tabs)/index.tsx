import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DropShadow from "react-native-drop-shadow";

import ProductInfoCard from "@/components/ProductInfoCard/ProductInfoCard";

export default function App() {
  const [searchText, setSearchText] = useState("");
  // const [fontsLoaded] = useFonts({
  //   SourceSerifPro_600SemiBold,
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }

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
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
          clearButtonMode="always" // iOS only
        />
        <Pressable>
          <Ionicons name="arrow-forward" size={20} color="#666" />
        </Pressable>
      </View>
      <DropShadow style={styles.shadowProp}>
        <ProductInfoCard />
      </DropShadow>
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
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  }
});
