import { View, Text } from 'react-native';
import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const user = useAppSelector(state => state.auth.user);

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 48 }}>{user?.username}</Text>
      <Text style={{ fontSize: 48 }}>This is Home</Text>
    </SafeAreaView>
  );
}
