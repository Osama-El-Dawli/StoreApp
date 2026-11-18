import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import LoginForm from './components/LoginForm';
import Ionicons from '@react-native-vector-icons/ionicons';
import CustomHeader from '../../components/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        enabled
        keyboardVerticalOffset={24}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <CustomHeader title="Login" />
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
    </SafeAreaView>
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
