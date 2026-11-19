import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Toast from 'react-native-simple-toast';
import Ionicons from '@react-native-vector-icons/ionicons';

type Props = {
  quantity: number;
  stock: number;
  onIncrement: () => void;
  onDecrement: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function Quantity({
  quantity,
  stock,
  onDecrement,
  onIncrement,
  style,
}: Props) {
  const minDisabled = quantity <= 0;
  const maxDisabled = stock <= 0 || quantity >= stock;

  const increase = () => {
    if (quantity < stock) {
      onIncrement();
    } else {
      Toast.show('Reached the available stock', Toast.SHORT);
    }
  };

  const decrease = () => onDecrement();

  return (
    <View style={[styles.stepper, style]}>
      <Pressable
        onPress={decrease}
        disabled={minDisabled}
        hitSlop={6}
        style={[styles.stepBtn, minDisabled && styles.stepBtnDisabled]}
      >
        <Ionicons name="remove" size={18} color="#fff" />
      </Pressable>

      <Text style={styles.quantity}>{quantity}</Text>

      <Pressable
        onPress={increase}
        disabled={maxDisabled}
        hitSlop={6}
        style={[styles.stepBtn, maxDisabled && styles.stepBtnDisabled]}
      >
        <Ionicons name="add" size={18} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#fff4eb',
  },
  stepBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ff751a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnDisabled: {
    backgroundColor: '#f5c7a6',
  },
  quantity: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
  },
});
