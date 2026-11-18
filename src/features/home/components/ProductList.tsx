import { View, ListRenderItemInfo, FlatList, Pressable } from 'react-native';
import React, { useCallback } from 'react';
import ProductItem from './ProductItem';
import { Product } from '../types/productType';
import { AutoSkeletonView } from 'react-native-auto-skeleton';

type Props = {
  products: Product[];
  isLoading: boolean;
  onProductPress: (product: Product) => void;
  ListHeaderComponent?: React.ReactElement;
};

export default function ProductList({
  products,
  isLoading,
  onProductPress,
  ListHeaderComponent,
}: Props) {
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Product>) => (
      <AutoSkeletonView isLoading={isLoading}>
        <ProductItem onPress={() => onProductPress(item)} product={item} />
      </AutoSkeletonView>
    ),
    [isLoading],
  );

  return (
    <View>
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
        data={products}
        renderItem={renderItem}
      />
    </View>
  );
}
