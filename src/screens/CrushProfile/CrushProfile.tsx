import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../../constants';
import { MainStackRoute } from '../../navigators/MainStack/MainStack.type';
import { MainRoutes } from '../../navigators/MainStack/MainStack.enum';
import { useRoute } from '@react-navigation/native';

export type CrushProfileRouteProps = Card;

type CrushProfileRouteParams = MainStackRoute<MainRoutes.CrushProfile>;

export const CrushProfile: React.FC = () => {
  const {
    params: { image, name },
  } = useRoute<CrushProfileRouteParams>();

  return (
    <View style={styles.root}>
      <ScrollView>
        <Image source={{ uri: image }} style={styles.image} />
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
