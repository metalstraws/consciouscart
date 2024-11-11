import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "./components/layout";
import {
  useFonts,
  SourceSerifPro_600SemiBold,
} from "@expo-google-fonts/source-serif-pro";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [fontsLoaded] = useFonts({
    SourceSerifPro_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Layout>
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
      </View>
    </Layout>
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
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
});
