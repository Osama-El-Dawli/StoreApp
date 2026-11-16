import { useNetInfo } from '@react-native-community/netinfo';

export function useIsOffline() {
  const { isConnected, isInternetReachable } = useNetInfo();
  return isConnected === false || isInternetReachable === false;
}
