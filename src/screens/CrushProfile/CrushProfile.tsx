import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../../constants';
import { MainStackRoute } from '../../navigators/MainStack/MainStack.type';
import { MainRoutes } from '../../navigators/MainStack/MainStack.enum';
import { useRoute } from '@react-navigation/native';
import Animated from 'react-native-reanimated';

export type CrushProfileRouteProps = Card;

type CrushProfileRouteParams = MainStackRoute<MainRoutes.CrushProfile>;

export const CrushProfile: React.FC = () => {
  const {
    params: { image, name, id },
  } = useRoute<CrushProfileRouteParams>();

  return (
    <View style={styles.root}>
      <ScrollView>
        <Animated.Image
          source={{ uri: image }}
          style={styles.image}
          sharedTransitionTag={`crush-${id}`}
        />
        <Text>{name}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
});
