import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { url } from 'zod';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Product } from '../types/productType';

type Props = {
  product: Product;
}

export default function ProductItem({product}: Props) {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: product.thumbnail,
        }}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
          {product.description}
        </Text>
        <View style={styles.container}>
          <Text style={styles.category}>{product.category}</Text>
          <View style={styles.rate}>
            <Text>{product.rating}</Text>
            <Ionicons name="star" color={'orange'} />
          </View>
        </View>
      </View>
      <Text style={styles.price}>{product.price}$</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    flexDirection: 'row',
    height: 130,
    borderWidth: 2,
    borderColor: 'orange',
    borderRadius: 16,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
  },
  info: {
    marginHorizontal: 8,
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginVertical: 4,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    color: '#777',
    marginBottom: 8,
  },
  category: {
    color: 'orange',
    fontSize: 14,
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    color: '#ff751a',
    fontWeight: 'bold',
    marginRight: 12,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
});
