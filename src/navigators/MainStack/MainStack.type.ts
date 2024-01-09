import { RouteProp } from '@react-navigation/native';
import { CrushProfileRouteProps } from '../../screens';
import { MainRoutes } from './MainStack.enum';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type MainStackParamList = {
  [MainRoutes.Home]: undefined;
  [MainRoutes.CrushProfile]: CrushProfileRouteProps;
};

export type MainStackRoute<T extends MainRoutes> = RouteProp<
  MainStackParamList,
  T
>;

export type MainStackNavigation<T extends MainRoutes> =
  NativeStackNavigationProp<MainStackParamList, T>;
