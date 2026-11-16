import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ProductList from './components/ProductList';
import FilterList from './components/FilterList';
import { AutoSkeletonView } from 'react-native-auto-skeleton';
import { fetchCategories } from './redux/categoryThunks';
import { fetchProducts } from './redux/productThunks';

export default function HomeScreen() {
  const dispatch = useAppDispatch();

  const {
    items: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useAppSelector(state => state.categories);

  const {
    products,
    error: productError,
    isLoading: productLoading,
  } = useAppSelector(state => state.products);

  const loadData = useCallback(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <View style={styles.container}>
      <ProductList
        isLoading={productLoading}
        products={products}
        ListHeaderComponent={
          <>
            <Text style={styles.categories}>Categories:</Text>
            {categoriesError != null ? <Text>{categoriesError}</Text> : null}
            <FilterList isLoading={categoriesLoading} categories={categories} />
            <Text style={styles.products}>Products:</Text>
          </>
        }
      />
    </View>
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
