import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  splash: undefined;
  login: undefined;
  home: NavigatorScreenParams<MainTabParams>;
};

export type MainTabParams = {
  homeTab: undefined;
  profileTab: undefined;
}