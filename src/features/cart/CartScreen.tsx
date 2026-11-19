import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function CartScreen() {
  const navigation = useNavigation<Nav>();
  return (
    <SafeAreaView>
      <CustomHeader
        title="Cart"
        showBack={true}
        centerTitle={true}
        onBack={navigation.goBack}
      />
      <Text>CartScreen</Text>
    </SafeAreaView>
  );
}
