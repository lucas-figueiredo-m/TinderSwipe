import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { SharedValue } from 'react-native-reanimated';
import { CARD_HEIGHT, CARD_WIDHT, useSwipeCard } from './useSwipeCard';

type CardProps = {
  cardIndex: number;
  numOfCards: number;
  image: string;
  name: string;
  activeCardIndex: SharedValue<number>;
  onLike: () => void;
  onDislike: () => void;
  onCardPress: () => void;
};

export const Card: React.FC<CardProps> = ({
  cardIndex,
  numOfCards,
  image,
  name,
  activeCardIndex,
  onLike,
  onDislike,
  onCardPress,
}) => {
  const { gesture, cardAnimation, likeAnimation, nopeAnimation } = useSwipeCard(
    {
      cardIndex,
      numOfCards,
      activeCardIndex,
      onLike,
      onDislike,
    },
  );

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.root, cardAnimation]}>
        <TouchableOpacity activeOpacity={0.95} onPress={onCardPress}>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.container}>
            <Animated.View
              style={[
                styles.selectedContainer,
                styles.nopeContainer,
                nopeAnimation,
              ]}>
              <Text style={[styles.selectedText, styles.nope]}>Nope</Text>
            </Animated.View>
            <Animated.View
              style={[
                styles.selectedContainer,
                styles.likeContainer,
                likeAnimation,
              ]}>
              <Text style={[styles.selectedText, styles.like]}>Like</Text>
            </Animated.View>
          </View>
          <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  root: {
    width: CARD_WIDHT,
    height: CARD_HEIGHT,
    borderRadius: 24,
    position: 'absolute',
  },
  name: {
    position: 'absolute',
    bottom: 32,
    left: 32,
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    resizeMode: 'cover',
  },
  container: {
    position: 'absolute',
    top: 24,
    width: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedContainer: {
    borderWidth: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  selectedText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  like: {
    color: 'lightgreen',
  },

  nope: {
    color: 'lightcoral',
  },
  likeContainer: {
    borderColor: 'lightgreen',
    transform: [{ rotateZ: '15deg' }],
  },
  nopeContainer: {
    transform: [{ rotateZ: '-15deg' }],
    borderColor: 'lightcoral',
  },
});
