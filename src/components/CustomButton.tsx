import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

type CustomButtonProps = {
  text: string;
  disabled?: boolean;
  onPress: () => void | Promise<void>;
  style?: StyleProp<ViewStyle>;
};

export default function CustomButton({
  text,
  disabled = false,
  style,
  onPress,
}: CustomButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[style, styles.btn, disabled && styles.disableBtn]}
      disabled={disabled}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#FE8C00',
    width: '100%',
    borderRadius: 16,
    alignItems: 'center',
    padding: 16,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'medium',
  },
  disableBtn: {
    backgroundColor: '#ffd8a6',
  },
});
