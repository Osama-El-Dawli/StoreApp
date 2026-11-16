import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  splash: undefined;
  login: undefined;
  home: NavigatorScreenParams<MainTabParams> | undefined;
};

export type MainTabParams = {
  homeTab: undefined;
  profileTab: undefined;
};
