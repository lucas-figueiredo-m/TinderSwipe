import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const CARD_WIDHT = width * 0.8;
const CARD_HEIGHT = height * 0.6;

type CardProps = {
  cardIndex: number;
  numOfCards: number;
  image: string;
  name: string;
  activeCardIndex: SharedValue<number>;
  onLike: () => void;
  onDislike: () => void;
};

export const Card: React.FC<CardProps> = ({
  cardIndex,
  numOfCards,
  image,
  name,
  activeCardIndex,
  onLike,
  onDislike,
}) => {
  const offset = useSharedValue({ x: 0, y: 0 });
  const initialCardIndex = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(
      activeCardIndex.value,
      [cardIndex - 1, cardIndex, cardIndex + 1],
      [0.95, 1, 1],
    );
    const opacity = interpolate(
      activeCardIndex.value,
      [cardIndex - 1, cardIndex, cardIndex + 1],
      [0.85, 1, 1],
    );
    const translateY = interpolate(
      activeCardIndex.value,
      [cardIndex - 1, cardIndex, cardIndex + 1],
      [-CARD_HEIGHT / 18, 0, 0],
    );
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY },
        { rotateZ: `${offset.value.x / 20}deg` },
        { scale },
      ],
      zIndex: numOfCards - cardIndex,
      opacity,
    };
  }, []);

  const likeAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(offset.value.x, [0, -width / 4], [0, 1]);
    return { opacity };
  }, []);

  const nopeAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(offset.value.x, [0, width / 4], [0, 1]);
    return { opacity };
  }, []);

  const gesture = Gesture.Pan()
    .onStart(() => {
      initialCardIndex.value = activeCardIndex.value;
    })
    .onUpdate(({ translationX }) => {
      offset.value = {
        x: translationX,
        y: Math.abs(translationX * 0.05),
      };
      activeCardIndex.value =
        initialCardIndex.value + Math.abs(translationX / (width / 2));
    })
    .onEnd(({ velocityX, translationX }) => {
      if (Math.abs(velocityX) > 400) {
        const toValue = Math.sign(velocityX) * 500;
        offset.value = withSpring(
          { x: toValue, y: 0 },
          { velocity: velocityX },
        );

        activeCardIndex.value = withSpring(initialCardIndex.value + 1);

        if (translationX > 0) {
          runOnJS(onDislike)();
        } else {
          runOnJS(onLike)();
        }
      } else {
        offset.value = withSpring({ x: 0, y: 0 });
        activeCardIndex.value = withSpring(initialCardIndex.value);
      }
    });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.root, animatedStyles]}>
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
