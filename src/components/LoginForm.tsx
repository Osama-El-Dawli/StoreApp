import { View } from 'react-native';
import CustomTextInput from './CustomTextInput';
import CustomButton from './CustomButton';
import { Controller, useForm } from 'react-hook-form';
import { LoginFormData, loginSchema } from '../schemas/LoginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type LoginNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'login'
>;

export default function LoginForm() {
  const navigation = useNavigation<LoginNavigationProp>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Form Data:', data);
    navigation.replace('home');
  };

  return (
    <View>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <CustomTextInput
            title="Email"
            value={value}
            placeholder="user@example.com"
            onChangeText={onChange}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <CustomTextInput
            title="Password"
            value={value}
            placeholder="Enter Your Password"
            onChangeText={onChange}
            error={errors.password?.message}
            isPassword={true}
          />
        )}
      />

      <CustomButton text="Login" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
