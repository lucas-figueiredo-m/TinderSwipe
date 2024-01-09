import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Card } from '../../components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { cards } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigation } from '../../navigators/MainStack/MainStack.type';
import { MainRoutes } from '../../navigators/MainStack/MainStack.enum';

type CrushProfileNavigationParams =
  MainStackNavigation<MainRoutes.CrushProfile>;

export const Home: React.FC = () => {
  const activeCardIndex = useSharedValue(0);
  const [cardList, setCardList] = useState(cards);

  const { navigate } = useNavigation<CrushProfileNavigationParams>();

  const onLike = useCallback(() => {
    setCardList(prev => prev.slice(1));
  }, []);

  const onDislike = useCallback(() => {
    setCardList(prev => prev.slice(1));
  }, []);

  useEffect(() => {
    if (cardList.length < 3) {
      console.log('Running out for cards, fetching more!');
    }
  }, [cardList]);

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.safeView}>
        {cardList.map((card, index) => (
          <Card
            key={card.id}
            cardIndex={index}
            numOfCards={cards.length}
            image={card.image}
            onLike={onLike}
            onDislike={onDislike}
            name={card.name}
            activeCardIndex={activeCardIndex}
            onCardPress={() => navigate(MainRoutes.CrushProfile, card)}
          />
        ))}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
