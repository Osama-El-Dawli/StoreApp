import Ionicons from '@react-native-vector-icons/ionicons';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Prop = {
  title: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  isPassword?: boolean;
  error?: string;
};

export default function CustomTextInput({
  title,
  value,
  placeholder,
  onChangeText,
  isPassword = false,
  error,
}: Prop) {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <KeyboardAvoidingView behavior="padding">
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>{title}</Text>
        {isPassword && (
          <Ionicons
            style={styles.icon}
            name={isVisible ? 'eye' : 'eye-off'}
            onPress={() => setIsVisible(!isVisible)}
            size={24}
          />
        )}
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !isVisible}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          style={[styles.input, isFocused && styles.inputFocused]}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  icon: {
    position: 'absolute',
    right: 12,
    top: 42,
    zIndex: 1,
  },
  title: {
    fontSize: 16,
    paddingBottom: 6,
  },
  input: {
    padding: 12,
    height: 52,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  inputFocused: {
    borderColor: 'orange',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
});
