import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import React from 'react';
import { CartItem } from '../types/cardType';
import { useAppDispatch } from '../../../store/hooks';
import Ionicons from '@react-native-vector-icons/ionicons';
import {
  changeColor,
  decrement,
  increment,
  removeItem,
} from '../redux/cartSlice';
import Quantity from '../../home/components/Quantity';
import ProductColors from '../../home/components/ProductColors';

type Props = {
  item: CartItem;
};

function CartListItem({ item }: Props) {
  const dispatch = useAppDispatch();
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.product.thumbnail }} style={styles.image} />

      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.title}>
          {item.product.title}
        </Text>

        <ProductColors
          selectedColor={item.color}
          onSelect={color => dispatch(changeColor({ id: item.id, color }))}
        />

        <Text style={styles.price}>
          ${(item.product.price * item.quantity).toFixed(2)}
        </Text>

        <Quantity
          quantity={item.quantity}
          stock={item.product.stock}
          onIncrement={() =>
            dispatch(increment({ product: item.product, color: item.color }))
          }
          onDecrement={() =>
            dispatch(
              decrement({
                productId: String(item.product.id),
                color: item.color,
              }),
            )
          }
        />
      </View>

      <Pressable
        onPress={() => dispatch(removeItem(item.id))}
        style={styles.removeBtn}
      >
        <Ionicons name="trash-outline" size={20} color="red" />
      </Pressable>
    </View>
  );
}

export default React.memo(CartListItem);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 100,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  info: { flex: 1, marginLeft: 10 },
  title: { fontSize: 14, fontWeight: 'bold', color: '#222' },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  colorText: { fontSize: 12, color: '#888' },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ff751a',
    marginVertical: 6,
  },
  removeBtn: { padding: 4 },
});
