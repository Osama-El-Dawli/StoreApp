import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import animatedSplash from '../assets/lottie/splash.json';
import { StyleSheet } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={animatedSplash}
        autoPlay={true}
        loop={true}
        onAnimationFinish={() => {}}
        style={styles.animatedIcon}
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
    width: 300,
    height: 300,
  },
});
