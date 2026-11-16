import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { AutoSkeletonView } from 'react-native-auto-skeleton';

type Props = {
  category: string;
  isSelected: boolean;
  onPress: () => void;
  isLoading: boolean;
};

export default function FilterItem({
  category,
  isSelected,
  onPress,
  isLoading,
}: Props) {
  return (
    <AutoSkeletonView isLoading={isLoading}>
      <Pressable onPress={onPress}>
        <View style={[styles.container, isSelected && styles.selected]}>
          <Text style={[styles.text, isSelected && styles.selectedText]}>
            {category}
          </Text>
        </View>
      </Pressable>
    </AutoSkeletonView>
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
  selectedText: {
    color: 'orange',
  },
  selected: {
    borderColor: 'orange',
  },
});
