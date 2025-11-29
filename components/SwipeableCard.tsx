import React, { useCallback } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import FlashCard from './FlashCard';
import { Question } from '@/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

type SwipeableCardProps = {
  question: Question;
  randomImageId: number;
  showAnswer: boolean;
  handleReveal: () => void;
  subjectColor: string;
  shouldLoadImage: boolean;
  onSwipe: () => void;
  style?: any;
};

export const SwipeableCard = ({
  question,
  randomImageId,
  showAnswer,
  handleReveal,
  subjectColor,
  shouldLoadImage,
  onSwipe,
  style,
}: SwipeableCardProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const cardScale = useSharedValue(1);
  const cardOpacity = useSharedValue(1);

  const handleCardSwiped = useCallback(() => {
    'worklet';
    runOnJS(onSwipe)();
  }, [onSwipe]);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;

      const progress = Math.min(Math.abs(event.translationX) / SCREEN_WIDTH, 1);
      cardOpacity.value = 1 - progress * 0.5;
      cardScale.value = 1 - progress * 0.1;
    })
    .onEnd((event) => {
      const shouldSwipe = Math.abs(event.translationX) > SWIPE_THRESHOLD;

      if (shouldSwipe) {
        translateX.value = withTiming(
          event.translationX > 0 ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5,
          { duration: 200 },
          (isFinished) => {
            if (isFinished) {
              handleCardSwiped();
            }
          }
        );
        cardOpacity.value = withTiming(0, { duration: 200 });
        cardScale.value = withTiming(0.8, { duration: 200 });
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        cardOpacity.value = withSpring(1);
        cardScale.value = withSpring(1);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotateZ = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      [-10, 0, 10],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    return {
      opacity: cardOpacity.value,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: cardScale.value },
        { rotateZ: `${rotateZ}deg` },
      ],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[style, animatedStyle]}>
        <FlashCard
          question={question}
          randomImageId={randomImageId}
          showAnswer={showAnswer}
          handleReveal={handleReveal}
          subjectColor={subjectColor}
          shouldLoadImage={shouldLoadImage}
        />
      </Animated.View>
    </GestureDetector>
  );
};
