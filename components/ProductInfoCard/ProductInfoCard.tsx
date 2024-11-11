import React from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";

export default function ProductInfoCard() {
    return(
        <View style={styles.container}>
            <Text>Product Name: Ketchup</Text>
            <Text>Brand: Heinz</Text>
            <Text>Packaging: Metal</Text>
            <Text>EcoScore: 65</Text> 
            <Text>Available Stores: Tesco, M&S</Text>
            <Text>Image here</Text> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        height: 300,
        backgroundColor: "#fff",
        marginTop: 50,
        borderRadius: 10,
        gap: 5,
    }
})