import { View, Pressable, StyleSheet } from 'react-native';
import React from 'react';

export const PRODUCT_COLORS = ['red', 'blue', 'black'];

type Props = {
  selectedColor?: string;
  onSelect: (color: string) => void;
};

export default function ProductColors({ selectedColor, onSelect }: Props) {
  return (
    <View style={styles.container}>
      {PRODUCT_COLORS.map(color => (
        <Pressable
          key={color}
          onPress={() => onSelect(color)}
          style={[
            styles.color,
            { backgroundColor: color },
            selectedColor === color && styles.selectedColor,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  color: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: 'orange',
  },
});
