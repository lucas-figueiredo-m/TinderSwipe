import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CrushProfile, Home } from '../../screens';

const Stack = createNativeStackNavigator();

export const MainStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CrushProfile" component={CrushProfile} />
    </Stack.Navigator>
  );
};
