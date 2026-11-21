import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../store/hooks';
import Ionicons from '@react-native-vector-icons/ionicons';
import CartListItem from './components/CartListItem';
import Animated, { FadeInDown } from 'react-native-reanimated';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function CartScreen() {
  const navigation = useNavigation<Nav>();
  const itemsMap = useAppSelector(state => state.cart.items);

  const items = useMemo(() => Object.values(itemsMap), [itemsMap]);
  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items],
  );

  return (
    <SafeAreaView style={cartStyles.container}>
      <CustomHeader
        title="Cart"
        showBack={true}
        centerTitle={true}
        onBack={navigation.goBack}
      />
      <FlatList
        contentContainerStyle={cartStyles.list}
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <Animated.View
            style={{ flex: 1 }}
            entering={FadeInDown.delay(200 * index)
              .springify()
              .duration(600)
              .damping(50)
              .withInitialValues({ translateY: 100 })}
          >
            <CartListItem item={item} />
          </Animated.View>
        )}
        ListEmptyComponent={
          <View style={cartStyles.empty}>
            <Ionicons name="cart-outline" size={64} color={'#ccc'} />
            <Text style={cartStyles.emptyText}>Your cart is empty</Text>
          </View>
        }
      />

      {items.length > 0 && (
        <View style={cartStyles.footer}>
          <Text style={cartStyles.totalLabel}>Total Price</Text>
          <Text style={cartStyles.totalValue}>${totalPrice.toFixed(2)}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const cartStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  list: { padding: 12, flexGrow: 1 },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: { marginTop: 10, fontSize: 16, color: '#999' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: { fontSize: 16, color: '#555' },
  totalValue: { fontSize: 20, fontWeight: 'bold', color: '#ff751a' },
});
