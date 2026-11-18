import { View, Text, Image, StyleSheet, Alert, Pressable } from 'react-native';
import React from 'react';
import Toast from 'react-native-simple-toast';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Product } from '../types/productType';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { AdminEmail } from '../../../api/apiConst';
import { removeProduct } from '../redux/productThunks';
import Quantity from './Quantity';

type Props = {
  product: Product;
  quantity: number;
  onQuantityChange: (productId: string, quantity: number) => void;
  onPress: () => void;
};

function ProductItem({ product, quantity, onQuantityChange, onPress }: Props) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const isAdmin = user?.email === AdminEmail;

  const stock = product.stock ?? 0;
  const outOfStock = stock <= 0;

  const handleDelete = () => {
    Alert.alert('Delete Product', `Do you want to delete ${product.title}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const result = await dispatch(removeProduct(String(product.id)));
          if (removeProduct.rejected.match(result)) {
            Toast.show(
              (result.payload as string) ??
                result.error.message ??
                'Delete Failed',
              Toast.LONG,
            );
          }
        },
      },
    ]);
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: product.thumbnail }}
          resizeMode="cover"
          style={styles.image}
        />

        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#FFA500" />
          <Text style={styles.ratingText}>{product.rating}</Text>
        </View>

        {isAdmin ? (
          <Pressable
            onPress={handleDelete}
            hitSlop={8}
            style={styles.deleteBtn}
          >
            <Ionicons name="trash-outline" size={16} color="#fff" />
          </Pressable>
        ) : null}
      </View>

      <View style={styles.info}>
        <Text style={styles.category} numberOfLines={1}>
          {product.category}
        </Text>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={[styles.stock, outOfStock && styles.stockOut]}>
            {outOfStock ? 'Out of stock' : `${stock} in stock`}
          </Text>
        </View>

        <Quantity
          style={styles.stepper}
          quantity={quantity}
          stock={stock}
          onChange={q => onQuantityChange(String(product.id), q)}
        />
      </View>
    </Pressable>
  );
}

export default React.memo(ProductItem);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#f2f2f2',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  deleteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(220,38,38,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    padding: 10,
  },
  category: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ff751a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    minHeight: 36,
  },
  description: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
    minHeight: 28,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ff751a',
  },
  stock: {
    fontSize: 11,
    color: '#16a34a',
    fontWeight: '600',
  },
  stockOut: {
    color: '#dc2626',
  },
  stepper: {
    marginTop: 10,
  },
});
