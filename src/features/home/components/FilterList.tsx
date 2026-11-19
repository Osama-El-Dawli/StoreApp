import { View, FlatList, StyleSheet, ListRenderItemInfo } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import FilterItem from './FilterItem';
import { Category } from '../types/categoryType';
import Animated, { FadeInRight } from 'react-native-reanimated';

type Props = {
  categories: Category[];
  isLoading: boolean;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

const ALL_CATEGORY: Category = {
  name: 'all',
  slug: 'all',
};


export default function FilterList({
  categories,
  isLoading,
  selectedCategory,
  onSelectCategory,
}: Props) {
  const data = useMemo(() => [ALL_CATEGORY, ...categories], [categories]);

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<Category>) => (
      <Animated.View
        entering={FadeInRight.delay(
          Math.min(index, 8) * 70,
        )
          .springify()
          .damping(50)
          .duration(600)
          .withInitialValues({
            transform: [{ translateX: 60 }],
          })}
      >
        <FilterItem
          isLoading={isLoading}
          isSelected={item.slug === selectedCategory}
          onPress={() => onSelectCategory(item.slug)}
          category={item.name}
        />
      </Animated.View>
    ),
    [isLoading, selectedCategory, onSelectCategory],
  );

  return (
    <View>
      <FlatList
        style={styles.list}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        extraData={selectedCategory}
        keyExtractor={item => item.slug}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 8,
  },
});
