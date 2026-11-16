import { View, Text, FlatList } from 'react-native';
import React from 'react';
import ProductItem from './ProductItem';

export default function ProductList() {
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[0, 1, 2, 5, 5, 5, 5, 7, 5, 5, 5, 5, 2, 5, 5, 5, 5]}
        renderItem={item => <ProductItem />}
      />
    </View>
  );
}
