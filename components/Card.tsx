import { StyleSheet, View, Dimensions, Animated, Text } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Question } from '@/types';

type CardProps = {
  question: Question;
  isFirst: boolean;
  swipe: any;
  titlSign: any;
};

const { width, height } = Dimensions.get('window');

const Card = ({ question, isFirst, swipe, titlSign, ...rest }: CardProps) => {
  const rotate = Animated.multiply(swipe.x, titlSign).interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['8deg', '0deg', '-8deg'],
  });

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };
  return (
    <Animated.View style={[styles.container, isFirst && animatedCardStyle]} {...rest}>
      <View style={styles.image}></View>
      <LinearGradient colors={['transparent', 'rgba(0,0,0,0.9)']} style={styles.gradient}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.Q}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 25,
  },
  questionContainer: {},
  questionText: {
    fontSize: 16,
    fontWeight: '400',
  },
  image: {
    width: width * 0.9,
    height: height * 0.78,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: 'blue',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
});
