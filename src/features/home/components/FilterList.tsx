import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import FilterItem from './FilterItem';

export default function FilterList() {
  return (
    <View>
      <FlatList style={styles.list}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[0, 1, 2]}
        renderItem={() => <FilterItem />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 8,
  }
})