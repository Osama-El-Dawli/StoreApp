import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { AutoSkeletonView } from 'react-native-auto-skeleton';

type Props = {
  category: string;
};

export default function FilterItem({ category }: Props) {
  return (
      <View style={styles.container}>
        <Text style={styles.text}>{category}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    color: '#ccc',
    borderRadius: 100,
    marginRight: 8,
  },
  text: {
    padding: 8,
  },
});
