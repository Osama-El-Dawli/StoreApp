import Ionicons from '@react-native-vector-icons/ionicons';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type Props = {
  title: string;
  showBack?: boolean;
  centerTitle?: boolean;
  onBack?: () => void;
};

export default function CustomHeader({
  title,
  showBack = false,
  centerTitle = false,
  onBack,
}: Props) {
  return (
    <View style={styles.container}>
      {showBack ? (
        <Pressable onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
      ) : null}

      <View style={[styles.titleWrapper, centerTitle && { right: 0, left: 0 }]}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
    marginHorizontal: 8,
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 28,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  titleWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  backButton: {
    width: 40,
    height: 40,
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
