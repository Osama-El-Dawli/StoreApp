import { View, Text, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ProductList from './components/ProductList';
import FilterList from './components/FilterList';
import { fetchCategories } from './redux/categoryThunks';
import { fetchProducts, fetchProductsByCategory } from './redux/productThunks';
import { useIsOffline } from '../../hooks/useIsOffline';
import CustomHeader from '../../components/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Product } from './types/productType';
import ProductModal from './components/ProductModal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { decrement, increment } from '../cart/redux/cartSlice';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const isOffline = useIsOffline();
  const dispatch = useAppDispatch();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleQuantityIncrement = useCallback(
    (product: Product, color: string) => {
      dispatch(increment({ product, color }));
    },
    [dispatch],
  );
  const handleQuantityDecrement = useCallback(
    (productId: string, color: string) => {
      dispatch(decrement({ productId, color }));
    },
    [dispatch],
  );

  const handelProductPress = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

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

  const categoriesList = useMemo(
    () => (
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
    ),
    [categories, categoriesError, categoriesLoading, selectedCategory],
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader
        title="Products"
        showCart={true}
        onCartPress={() => {
          navigation.navigate('cart');
        }}
      />
      {isOffline ? (
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#ff0000',
          }}
        >
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
          onQuantityIncrement={handleQuantityIncrement}
          onQuantityDecrement={handleQuantityDecrement}
          onProductPress={handelProductPress}
          isLoading={productLoading}
          products={products}
          ListHeaderComponent={categoriesList}
        />
        <ProductModal
          onQuantityIncrement={handleQuantityIncrement}
          onQuantityDecrement={handleQuantityDecrement}
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    flex: 1,
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
