import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../features/auth/LoginScreen';
import SplashScreen from '../features/splash/SplashScreen';
import { RootStackParamList } from './types';
import MainTabs from './MainTabs';
import CartScreen from '../features/cart/CartScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={'splash'}
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#ffffff' },
      }}
    >
      <Stack.Screen name={'splash'} component={SplashScreen} />
      <Stack.Screen
        name={'login'}
        component={LoginScreen}
      />
      <Stack.Screen name={'home'} component={MainTabs} />
      <Stack.Screen name={'cart'} component={CartScreen} />
    </Stack.Navigator>
  );
}
