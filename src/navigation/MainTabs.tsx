import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParams } from './types';
import HomeScreen from '../features/home/HomeScreen';
import Ionicons from '@react-native-vector-icons/ionicons';
import ProfileScreen from '../features/profile/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParams>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="homeTab"
      screenOptions={{
        sceneStyle: { backgroundColor: 'white' },
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#e67e22',
        tabBarInactiveTintColor: '#999999',
      }}
    >
      <Tab.Screen
        name="homeTab"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: true,
          headerTitle: 'Products',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="profileTab"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerShown: true,
          tabBarBadgeStyle: {
            fontSize: 24,
            color: 'red',
          },
          headerTitle: 'My Profile',
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
