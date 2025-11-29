import React, { useRef, useState } from 'react';
import { Animated, View, PanResponder, Pressable, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FlashCard from './FlashCard';
import { Question } from '@/types';

import { generateUniqueRandomNumbers } from '@/utils';

type MoveableProps = {
  questions: Question[];
  subjectColor?: string;
};

const Moveable = ({ questions, subjectColor = '#906D88' }: MoveableProps) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const randomImageNumbers = useRef(generateUniqueRandomNumbers(questions.length, 500)).current;
  const touchThreshold = 10;
  const [questionNumber, setQuestionNumber] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const removeTopCard = () => {
    setQuestionNumber((prevState) => prevState + 1);
    setShowAnswer(false);
    Animated.timing(pan, {
      duration: 0,
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dx, dy } = gestureState;

        return Math.abs(dx) > touchThreshold || Math.abs(dy) > touchThreshold;
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x }], { useNativeDriver: false }),
      onPanResponderRelease: (_, { dx, dy }) => {
        const direction = Math.sign(dx);
        const isActionActive = Math.abs(dx) > 100;
        if (isActionActive) {
          Animated.timing(pan, {
            duration: 200,
            toValue: {
              x: direction * 500,
              y: dy,
            },
            useNativeDriver: true,
          }).start(removeTopCard); //.swipe(removeTopCard)
        } else {
          Animated.spring(pan, {
            toValue: {
              x: 0,
              y: 0,
            },
            useNativeDriver: true,
            friction: 5,
          }).start();
        }
      },
    })
  ).current;

  const handleReveal = () => {
    setShowAnswer((prevState) => !prevState);
  };

  const resetTest = () => {
    setQuestionNumber(0);
  };

  const rotate = pan.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-10deg', '0deg', '10deg'],
  });
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {questions[questionNumber] ? (
        <Animated.View
          style={{
            zIndex: 100,
            transform: [{ translateX: pan.x }, { rotate }],
          }}
          {...panResponder.panHandlers}>
          <FlashCard
            question={questions[questionNumber]}
            randomImageId={randomImageNumbers[questionNumber]}
            showAnswer={showAnswer}
            handleReveal={handleReveal}
            subjectColor={subjectColor}
          />
        </Animated.View>
      ) : null}

      <View style={{ position: 'absolute', zIndex: 0, justifyContent: 'center' }}>
        {questions[questionNumber + 1] ? (
          <FlashCard
            question={questions[questionNumber + 1]}
            randomImageId={randomImageNumbers[questionNumber + 1]}
            showAnswer={false}
            handleReveal={() => {}}
            subjectColor={subjectColor}
          />
        ) : (
          <Pressable
            onPress={resetTest}
            style={{ ...styles.resetButton, backgroundColor: subjectColor }}>
            <MaterialCommunityIcons name="refresh" size={18} color="white" />
            <Text style={styles.resetButtonText}>Start again</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resetButton: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: 'white',
  },
});

export default Moveable;
