import LottieView from 'lottie-react-native';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import animatedSplash from '../../assets/lottie/splash.json';
import { RootStackParamList } from '../../navigation/types';

type Prop = NativeStackScreenProps<RootStackParamList, 'splash'>;

export default function SplashScreen({ navigation }: Prop) {
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={animatedSplash}
        autoPlay
        loop={false}
        style={styles.animatedIcon}
        onAnimationFinish={() => {
          navigation.replace('login');
        }}
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
