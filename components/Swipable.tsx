import { StyleSheet, Text, View, Animated, PanResponder, Dimensions } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import Card from './Card';
import { ClassObj, Question } from '@/types';

type SwipableProps = {
  classObj: ClassObj;
};

const { height, width } = Dimensions.get('screen');

const Swipable = ({ classObj: { questions } }: SwipableProps) => {
  const [qs, setQuestions] = useState<Question[]>(questions);

  const swipe = useRef(new Animated.ValueXY()).current;
  const titlSign = useRef(new Animated.Value(1)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      titlSign.setValue(y0 > (height * 0.9) / 2 ? 1 : 0);
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > 100;

      if (isActionActive) {
        Animated.timing(swipe, {
          duration: 2000,
          toValue: {
            x: direction * 500,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeTopCard = useCallback(() => {
    // Reset swipe position before removing card to prevent next card from flashing
    swipe.setValue({ x: 0, y: 0 });
    setQuestions((prevState) => prevState.slice(1));
  }, [swipe]);

  useEffect(() => {
    if (!qs.length) {
      setQuestions(qs);
    }
  }, [qs]);

  return qs.map((q, index) => {
    const isFirst = index === 0;
    const dragHandlers = isFirst ? panResponder.panHandlers : {};
    return (
      <Card
        key={q.A}
        question={q}
        isFirst={isFirst}
        swipe={swipe}
        titlSign={titlSign}
        {...dragHandlers}
      />
    );
  });
};

export default Swipable;

const styles = StyleSheet.create({});
