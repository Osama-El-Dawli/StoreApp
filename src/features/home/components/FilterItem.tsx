import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function FilterItem() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>FilterItem</Text>
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
