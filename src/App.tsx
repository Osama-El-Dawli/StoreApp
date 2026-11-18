import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { View } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1, direction: 'ltr' }}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </View>
    </Provider>
  );
}
