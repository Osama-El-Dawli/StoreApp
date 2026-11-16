import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import { RootStackParamList } from './types';

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
        options={{
          headerShown: true,
          headerTitle: 'Login',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#fce7cd',
          },
        }}
      />
      <Stack.Screen name={'home'} component={HomeScreen} />
    </Stack.Navigator>
  );
}
