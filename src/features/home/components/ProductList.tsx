import { View, Text, FlatList } from 'react-native';
import React from 'react';
import ProductItem from './ProductItem';
import { Product } from '../types/productType';
import { AutoSkeletonView } from 'react-native-auto-skeleton';

type Props = {
  products: Product[];
  isLoading: boolean;
  ListHeaderComponent?: React.ReactElement;
};

export default function ProductList({
  products,
  isLoading,
  ListHeaderComponent,
}: Props) {
  return (
    <View>
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
        data={products}
        renderItem={products => (
          <AutoSkeletonView isLoading={isLoading}>
            <ProductItem product={products.item} />
          </AutoSkeletonView>
        )}
      />
    </View>
  );
}
