import React, {useState, useEffect} from "react";
import {View, Text, Image, StyleSheet, FlatList} from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

import fetchData from "@/app/utils/fetchData";

export default function ProductInfoCard() {

    interface Product {
        product_name: string;
        brands: string;
        packaging: string | null;
        ecoscore_score: number;
        stores: string[];
        image_url: string;
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
            <View style={{flex:1, justifyContent:"space-evenly", alignItems:"center"}}>
                <View style={styles.productInfoSection}>
                    <Text style={{fontSize:20, fontWeight:"bold", textAlign:"center"}}>{product?.product_name}</Text>
                    <Text>Brand: {product?.brands}</Text>
                </View>
                <View style={styles.productInfoSection}>
                    <Text style={{fontWeight:"600"}}>Packaging:</Text>
                    <Text>{!product?.packaging ? "No packaging information available" : product?.packaging}</Text>
                </View>
                <CircularProgress value={Number(product?.ecoscore_score)} duration={2500} strokeColorConfig={[
                    { color: 'red', value: 0 },
                    { color: 'orange', value: 50 },
                    { color: 'green', value: 100 },
                ]} progressValueColor={'#000'} />
                <View style={styles.storesContainer}>
                    <Text style={{fontWeight:"600", marginBottom:10}}>Available Stores:</Text>
                    <FlatList
                        data={product?.stores}
                        renderItem={({item}) => <Text>- {item.trim()}</Text>}
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.flatList}
                        scrollEnabled={false} 
                        nestedScrollEnabled={true}
                    />
                </View>
                <Image style={{
    width: 50,
    height: 70,
    resizeMode: 'contain'
  }} source={{uri: product?.image_url}} />
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
        height: 500,
        backgroundColor: "#fff",
        marginTop: 50,
        padding: 20,
        borderRadius: 10,
        gap: 5,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5, // Android only
    },
    productInfoSection: {
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    storesContainer: {
        width: '100%',
        maxHeight: 80, // Limit height
        marginVertical: 10,
        justifyContent: "space-evenly",
        alignItems: "center",
    }, 
    flatList: {
        flexGrow: 0,
    }
})