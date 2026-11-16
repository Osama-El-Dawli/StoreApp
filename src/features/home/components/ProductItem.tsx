import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { url } from 'zod';
import Ionicons from '@react-native-vector-icons/ionicons';

export default function ProductItem() {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
        }}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title}>title</Text>
        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam
          autem sed magnam iusto odit nesciunt asperiores esse. Repellendus sint
          deleniti eveniet, recusandae debitis vero minima reiciendis in maiores
          ullam autem.
        </Text>
        <View style={styles.container}>
          <Text style={styles.category}>Category</Text>
          <View style={styles.rate}>
            <Text>2.5</Text>
            <Ionicons name="star" color={'orange'} />
          </View>
        </View>
      </View>
      <Text style={styles.price}>9.99$</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    flexDirection: 'row',
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
    fontSize: 24,
    marginVertical: 4,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
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
