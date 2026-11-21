import { View, ListRenderItemInfo, FlatList } from 'react-native';
import React, { useCallback } from 'react';
import ProductItem from './ProductItem';
import { Product } from '../types/productType';
import { AutoSkeletonView } from 'react-native-auto-skeleton';
import Animated, { FadeInDown } from 'react-native-reanimated';

type Props = {
  products: Product[];
  isLoading: boolean;
  onQuantityIncrement: (product: Product, color: string) => void;
  onQuantityDecrement: (productId: string, color:string) => void;
  onProductPress: (product: Product) => void;
  ListHeaderComponent?: React.ReactElement;
};

export default function ProductList({
  products,
  isLoading,
  onQuantityIncrement,
  onQuantityDecrement,
  onProductPress,
  ListHeaderComponent,
}: Props) {
  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<Product>) => {
      const row = Math.min(Math.floor(index / 2), 6);
      return (
        <Animated.View
          style={{ flex: 1 }}
          entering={FadeInDown.delay(row * 300)
            .springify()
            .duration(600)
            .damping(20)
            .withInitialValues({ transform: [{ translateY: 100 }] })}
        >
          <AutoSkeletonView isLoading={isLoading}>
            <ProductItem
              product={item}
              onQuantityIncrement={onQuantityIncrement}
              onQuantityDecrement={onQuantityDecrement}
              onPress={onProductPress}
            />
          </AutoSkeletonView>
        </Animated.View>
      );
    },
    [
      isLoading,
      onQuantityIncrement,
      onQuantityDecrement,
      onProductPress,
    ],
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
        renderItem={renderItem}
      />
    </View>
  );
}
