import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useAppSelector } from '../../store/hooks';
import ProductList from './components/ProductList';
import FilterList from './components/FilterList';

export default function HomeScreen() {
  const user = useAppSelector(state => state.auth.user);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.categories}>Categories:</Text>
      <FilterList />
      <Text style={styles.products}>Products:</Text>
      <ProductList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  categories: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
  },
  products: {
    marginVertical: 12,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
