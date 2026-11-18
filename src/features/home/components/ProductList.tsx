import { View, ListRenderItemInfo, FlatList } from 'react-native';
import React, { useCallback } from 'react';
import ProductItem from './ProductItem';
import { Product } from '../types/productType';
import { AutoSkeletonView } from 'react-native-auto-skeleton';
import Animated, { FadeInDown } from 'react-native-reanimated';

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
    ({ item, index }: ListRenderItemInfo<Product>) => {
      const row = Math.min(Math.floor(index / 2), 6);
      return (
        <Animated.View
          style={{ flex: 1 }}
          entering={FadeInDown.delay(row * 300)
            .springify()
            .damping(20)
            .withInitialValues({ transform: [{ translateY: 100 }] })}
        >
          <AutoSkeletonView isLoading={isLoading}>
            <ProductItem
              product={item}
              quantity={quantities[String(item.id)] ?? 0}
              onQuantityChange={onQuantityChange}
              onPress={() => onProductPress(item)}
            />
          </AutoSkeletonView>
        </Animated.View>
      );
    },
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
