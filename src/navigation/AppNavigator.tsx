import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../features/auth/LoginScreen';
import SplashScreen from '../features/splash/SplashScreen';
import HomeScreen from '../features/home/HomeScreen';
import { RootStackParamList } from './types';
import MainTabs from './MainTabs';

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
      <Stack.Screen
        name={'home'}
        component={MainTabs}
        
      />
    </Stack.Navigator>
  );
}
