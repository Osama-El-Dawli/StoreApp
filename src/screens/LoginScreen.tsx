import { StyleSheet, Text, View } from 'react-native';
import LoginForm from '../components/LoginForm';
import Ionicons from '@react-native-vector-icons/ionicons';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Ionicons
        name="storefront-outline"
        size={100}
        color="#f97316"
        style={styles.icon}
      />
      <Text style={styles.title}>Store App</Text>
      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 24,
    marginBottom: 52,
    fontSize: 32,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  icon: {
    alignSelf: 'center',
    marginTop: 32,
  },
});
