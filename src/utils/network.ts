import NetInfo from '@react-native-community/netinfo';

export async function checkIsOffline() {
  const { isConnected, isInternetReachable } = await NetInfo.fetch();
  return isConnected === false || isInternetReachable === false;
}
