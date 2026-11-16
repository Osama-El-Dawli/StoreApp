import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import FilterItem from './FilterItem';
import { Category } from '../types/categoryType';

type Props = {
  categories: Category[];
  isLoading: boolean;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

export default function FilterList({
  categories,
  isLoading,
  selectedCategory,
  onSelectCategory,
}: Props) {
  const allCategories: Category = {
    name: 'all',
    slug: 'all',
  };

  return (
    <View>
      <FlatList
        style={styles.list}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[allCategories, ...categories]}
        renderItem={categories => (
          <FilterItem
            isLoading={isLoading}
            isSelected={categories.item.slug === selectedCategory}
            onPress={() => onSelectCategory(categories.item.slug)}
            category={categories.item.name}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 8,
  },
});
