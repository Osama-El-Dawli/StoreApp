import Ionicons from '@react-native-vector-icons/ionicons';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useAppSelector } from '../store/hooks';

type Props = {
  title: string;
  showBack?: boolean;
  centerTitle?: boolean;
  showCart?: boolean;
  onBack?: () => void;
  onCartPress?: () => void;
};

export default function CustomHeader({
  title,
  showBack = false,
  centerTitle = false,
  showCart = false,
  onCartPress,
  onBack,
}: Props) {
  
  const hasQuantities = useAppSelector(state =>
    Object.values(state.quantity.quantities).some(q => q > 0),
  );
  
  return (
    <View style={styles.container}>
      {showBack ? (
        <Pressable onPress={onBack} style={styles.btn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
      ) : null}

      <View style={[styles.titleWrapper, centerTitle && { right: 0, left: 0 }]}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {showCart ? (
        <View style={styles.cartWrapper}>
          <Pressable onPress={onCartPress} style={styles.btn}>
            <Ionicons name="cart" size={24} color="#fff" />
          </Pressable>
          {hasQuantities ? <View style={styles.redPoint} /> : null}
        </View>
      ) : null}
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
  cartWrapper: {
    position: 'absolute',
    right: 14,
    width: 40,
    height: 40,
  },
  btn: {
    width: 40,
    height: 40,
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redPoint: {
    position: 'absolute',
    top: 0,
    left: 10,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'red',
  },
});
