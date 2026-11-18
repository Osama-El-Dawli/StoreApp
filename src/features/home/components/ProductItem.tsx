import { View, Text, Image, StyleSheet, Alert, Pressable } from 'react-native';
import React from 'react';
import Toast from 'react-native-simple-toast';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Product } from '../types/productType';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { AdminEmail } from '../../../api/apiConst';
import { removeProduct } from '../redux/productThunks';

type Props = {
  product: Product;
  onPress: () => void
};

function ProductItem({ product ,onPress }: Props) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  const handleDelete = () => {
    Alert.alert('Delete Product', `Do you want to delete ${product.title}?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const result = await dispatch(removeProduct(String(product.id)));
          if (removeProduct.rejected.match(result)) {
            Toast.show(
              (result.payload as string) ??
                result.error.message ??
                'Delete Failed',
              Toast.LONG,
            );
          }
        },
      },
    ]);
  };

  return (
    <Pressable onPress={onPress}>

    <View style={styles.card}>
      <Image
        source={{
          uri: product.thumbnail,
        }}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
          {product.description}
        </Text>
        <View style={styles.container}>
          <Text style={styles.category}>{product.category}</Text>
          <View style={styles.rate}>
            <Text>{product.rating}</Text>
            <Ionicons name="star" color={'orange'} />
          </View>
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.price}>{product.price}$</Text>
        {user!.email === AdminEmail ? (
          <Text style={styles.deleteBtn} onPress={handleDelete}>
            delete
          </Text>
        ) : null}
      </View>
    </View>
    </Pressable>
  );
}

export default React.memo(ProductItem);

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    flexDirection: 'row',
    height: 130,
    borderWidth: 2,
    borderColor: 'orange',
    borderRadius: 16,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
  },
  info: {
    marginHorizontal: 8,
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginVertical: 4,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    color: '#777',
    marginBottom: 8,
  },
  category: {
    color: 'orange',
    fontSize: 14,
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    color: '#ff751a',
    fontWeight: 'bold',
    marginRight: 12,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deleteBtn: {
    padding: 4,
    marginTop: 8,
    color: 'red',
    fontSize: 14,
    fontWeight: 'medium',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'red',
  },
});
