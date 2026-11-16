import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ProductList from './components/ProductList';
import FilterList from './components/FilterList';
import { fetchCategories } from './redux/categoryThunks';
import { fetchProducts, fetchProductsByCategory } from './redux/productThunks';
import { useIsOffline } from '../../hooks/useIsOffline';

export default function HomeScreen() {
  const isOffline = useIsOffline();
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const products =
      selectedCategory === 'all'
        ? dispatch(fetchProducts())
        : dispatch(fetchProductsByCategory(selectedCategory));

    return () => products.abort();
  }, [selectedCategory, dispatch]);

  return (
    <View>
      {isOffline ? (
        <View style={{
          alignItems: 'center',
          backgroundColor: '#ff0000',
        }}>
        <Text
          style={{
            paddingVertical: 4,
            color: '#fff',
          }}
          >
          Connect to the internet
        </Text>
          </View>
      ) : null}
      <View style={styles.container}>
        {productError != null ? (
          <Text style={{ color: 'red', alignSelf: 'center' }}>
            {productError}
          </Text>
        ) : null}
        <ProductList
          isLoading={productLoading}
          products={products}
          ListHeaderComponent={
            <>
              <Text style={styles.categories}>Categories:</Text>
              {categoriesError != null ? (
                <Text style={{ color: 'red', alignSelf: 'center' }}>
                  {categoriesError}
                </Text>
              ) : null}
              <FilterList
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                isLoading={categoriesLoading}
                categories={categories}
              />
              <Text style={styles.products}>Products:</Text>
            </>
          }
        />
      </View>
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
