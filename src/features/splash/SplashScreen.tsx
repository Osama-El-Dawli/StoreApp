import LottieView from 'lottie-react-native';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import animatedSplash from '../../assets/lottie/splash.json';
import { RootStackParamList } from '../../navigation/types';
import { clearTokens, getTokens } from '../auth/storage/tokenStorage';
import { useAppDispatch } from '../../store/hooks';
import { logout, setTokens } from '../auth/redux/authSlice';
import { getMe } from '../auth/redux/authThunks';

type Prop = NativeStackScreenProps<RootStackParamList, 'splash'>;

export default function SplashScreen({ navigation }: Prop) {
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    try {
      const tokens = await getTokens();
      if (!tokens) {
        navigation.replace('login');
        return;
      }

      dispatch(setTokens(tokens));
      await dispatch(getMe()).unwrap();
      navigation.replace('home');
    } catch {
      await clearTokens();
      dispatch(logout());
      navigation.replace('login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={animatedSplash}
        autoPlay
        loop={false}
        style={styles.animatedIcon}
        onAnimationFinish={checkAuth}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedIcon: {
    width: '100%',
    height: '100%',
  },
});
