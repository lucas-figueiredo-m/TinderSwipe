import { Dimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import {
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type UseSwipeCard = {
  activeCardIndex: SharedValue<number>;
  cardIndex: number;
  numOfCards: number;
  onLike: () => void;
  onDislike: () => void;
};

const { width, height } = Dimensions.get('window');

export const CARD_WIDHT = width * 0.8;
export const CARD_HEIGHT = height * 0.6;

export const useSwipeCard = (props: UseSwipeCard) => {
  const offset = useSharedValue({ x: 0, y: 0 });
  const initialCardIndex = useSharedValue(0);

  const { activeCardIndex, cardIndex, numOfCards, onDislike, onLike } = props;

  const cardAnimation = useAnimatedStyle(() => {
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

  return { likeAnimation, nopeAnimation, gesture, cardAnimation };
};
