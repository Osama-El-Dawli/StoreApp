import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../auth/redux/authSlice';
import { clearTokens } from '../auth/storage/tokenStorage';
import InfoRow from './components/InfoRow';
import CustomButton from '../../components/CustomButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { AdminEmail } from '../../api/apiConst';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<Nav>();
  const { user } = useAppSelector(state => state.auth);

  const handleLogout = async () => {
    await clearTokens();
    dispatch(logout());
    navigation.replace('login');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user!.image }} style={styles.avatar} />
      <Text style={styles.name}>
        {user!.firstName} {user!.lastName}
      </Text>
      <Text style={styles.username}>{user!.username}</Text>
      <View style={styles.card}>
        <InfoRow label="Username" value={user!.username} />
        <InfoRow label="Email" value={user!.email} />
        <InfoRow label="Gender" value={user!.gender} />
        <InfoRow
          label="Role"
          value={user!.email === AdminEmail ? 'Admin' : 'User'}
        />
      </View>
      <CustomButton
        style={styles.logoutBtn}
        text="Logout"
        onPress={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: '#eee',
    marginTop: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 12,
  },
  username: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fce7cd',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  logoutBtn: {
    marginTop: 'auto',
    marginBottom: 16,
  },
});
