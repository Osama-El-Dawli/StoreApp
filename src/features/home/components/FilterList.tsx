import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import FilterItem from './FilterItem';
import { AutoSkeletonView } from 'react-native-auto-skeleton';
import { Category } from '../types/categoryType';

type Props = {
  categories: Category[];
  isLoading: boolean;
};

export default function FilterList({ categories, isLoading }: Props) {
  const allCategories: Category = {
    name: 'all',
  };

  return (
    <View>
      <FlatList
        style={styles.list}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[allCategories,...categories]}
        renderItem={categories => (
          <AutoSkeletonView isLoading={isLoading}>
            <FilterItem category={categories.item.name} />
          </AutoSkeletonView>
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
