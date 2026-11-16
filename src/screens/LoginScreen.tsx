import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LoginForm from '../components/LoginForm';
import Ionicons from '@react-native-vector-icons/ionicons';

export default function LoginScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Ionicons
          name="storefront-outline"
          size={100}
          color="#f97316"
          style={styles.icon}
        />
        <Text style={styles.title}>Store App</Text>
        <LoginForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
