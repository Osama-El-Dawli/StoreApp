import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Product } from '../types/productType';
import Quantity from './Quantity';
import { useAppSelector } from '../../../store/hooks';
import ProductColors, { PRODUCT_COLORS } from './ProductColors';

type Props = {
  product: Product | null;
  onQuantityIncrement: (product: Product, color: string) => void;
  onQuantityDecrement: (productId: string, color: string) => void;
  onClose: () => void;
};

function ProductModal({
  product,
  onQuantityIncrement,
  onQuantityDecrement,
  onClose,
}: Props) {
  const [color, setColor] = useState(PRODUCT_COLORS[0]);
  const quantity = useAppSelector(state =>
    product ? state.cart.items[`${product.id}-${color}`]?.quantity ?? 0 : 0,
  );
  return (
    <Modal visible={product != null} transparent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.card} onPress={() => {}}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#000" />
          </Pressable>

          {product ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Image
                source={{ uri: product.thumbnail }}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.title}>{product.title}</Text>
              <View style={styles.row}>
                <Text style={styles.price}>${product.price}</Text>
                <Text style={styles.category}>{product.category}</Text>
              </View>
              <Text style={styles.description}>{product.description}</Text>
              <Text style={styles.stock}>{product.stock} in Stock</Text>

              <ProductColors onSelect={setColor} selectedColor={color} />

              <Quantity
                style={styles.stepper}
                quantity={quantity}
                stock={product.stock ?? 0}
                onDecrement={() =>
                  onQuantityDecrement(String(product.id), color)
                }
                onIncrement={() => onQuantityIncrement(product, color)}
              />
            </ScrollView>
          ) : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default React.memo(ProductModal);

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: '#00000050',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    maxHeight: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    paddingTop: 32,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 220,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f97316',
  },
  category: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  stock: {
    marginTop: 16,
    fontSize: 16,
    alignSelf: 'center',
    color: '#16a34a',
    fontWeight: '600',
  },
  stepper: {
    alignSelf: 'center',
    width: 160,
    marginTop: 12,
  },
});
