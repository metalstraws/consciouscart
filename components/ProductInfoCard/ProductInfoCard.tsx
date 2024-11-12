import React, {useState, useEffect} from "react";
import {View, Text, Image, StyleSheet, FlatList} from "react-native";

import fetchData from "@/app/utils/fetchData";

export default function ProductInfoCard() {

    interface Product {
        product_name: string;
        brands: string;
        packaging: string | null;
        ecoscore_score: number;
        stores: string;
    }

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const getProducts = async () => {
        try {
        const data = await fetchData();
        setProduct(data);
        } catch (error) {
        console.error('Error fetching data:', error);
        } finally {
        setLoading(false);
        }
    };
    
    getProducts();
    }, []);

    return(
        <View style={styles.container}>
            {loading? (<Text>Loading...</Text>) : (
            <View>
                <Text>Product Name: {product?.product_name}</Text>
                <Text>Brand: {product?.brands}</Text>
                <Text>Packaging: {!product?.packaging ? "no packaging information available" : product?.packaging}</Text>
                <Text>EcoScore: {product?.ecoscore_score}</Text>
                <Text>Available Stores: {product?.stores}</Text>
                <Text>Image here</Text>
            </View>
            )}
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
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5, // Android only
    }
})