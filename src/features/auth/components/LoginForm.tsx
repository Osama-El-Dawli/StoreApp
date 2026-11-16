import { View } from 'react-native';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import { Controller, useForm } from 'react-hook-form';
import { LoginFormData, loginSchema } from '../schemas/LoginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { login } from '../redux/authThunks';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store/store';
import Toast from 'react-native-simple-toast';

type LoginNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'login'
>;

export default function LoginForm() {
  const navigation = useNavigation<LoginNavigationProp>();

  const dispatch = useAppDispatch();
  const { isLoading} = useAppSelector(
    (state: RootState) => state.auth,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await dispatch(
      login({
        username: data.username,
        password: data.password,
      }),
    );

    if (login.fulfilled.match(result)) {
      navigation.navigate('home');
    } else {
      Toast.show(
        result.payload || result.error.message || 'Login failed',
        Toast.LONG,
      );
    }
  };

  return (
    <View>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <CustomTextInput
            title="Username"
            value={value}
            placeholder="Enter Your Username"
            onChangeText={onChange}
            error={errors.username?.message}
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

      <CustomButton
        text={isLoading ? 'Logging in...' : 'Login'}
        disabled={isLoading}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}
