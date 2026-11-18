import { View, ListRenderItemInfo, FlatList } from 'react-native';
import React, { useCallback } from 'react';
import ProductItem from './ProductItem';
import { Product } from '../types/productType';
import { AutoSkeletonView } from 'react-native-auto-skeleton';

type Props = {
  products: Product[];
  isLoading: boolean;
  quantities: Record<string, number>;
  onQuantityChange: (productId: string, quantity: number) => void;
  onProductPress: (product: Product) => void;
  ListHeaderComponent?: React.ReactElement;
};

export default function ProductList({
  products,
  isLoading,
  quantities,
  onQuantityChange,
  onProductPress,
  ListHeaderComponent,
}: Props) {
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Product>) => (
      <View style={{ flex: 1 }}>
        <AutoSkeletonView isLoading={isLoading}>
          <ProductItem
            product={item}
            quantity={quantities[String(item.id)] ?? 0}
            onQuantityChange={onQuantityChange}
            onPress={() => onProductPress(item)}
          />
        </AutoSkeletonView>
      </View>
    ),
    [isLoading, quantities, onQuantityChange, onProductPress],
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        numColumns={2}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{ padding: 12, paddingBottom: 24 }}
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
        data={products}
        extraData={quantities}
        renderItem={renderItem}
      />
    </View>
  );
}
