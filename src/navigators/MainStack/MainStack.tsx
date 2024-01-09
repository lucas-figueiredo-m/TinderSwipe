import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CrushProfile, Home } from '../../screens';
import { MainRoutes } from './MainStack.enum';
import { MainStackParamList } from './MainStack.type';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={MainRoutes.Home} component={Home} />
      <Stack.Screen name={MainRoutes.CrushProfile} component={CrushProfile} />
    </Stack.Navigator>
  );
};
