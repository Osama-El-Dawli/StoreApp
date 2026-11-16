import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import FilterItem from './FilterItem';
import { AutoSkeletonView } from 'react-native-auto-skeleton';

type Props = {
  categories: string[];
  isLoading: boolean;
};

export default function FilterList({ categories, isLoading }: Props) {
  return (
    <View>
      <FlatList
        style={styles.list}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={item => item}
        renderItem={categories => (
          <AutoSkeletonView isLoading = {isLoading}>
            <FilterItem category={categories.item} />
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
