import React, { useRef, useState, useCallback } from 'react';
import { View, Dimensions, Pressable, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FlashCard from './FlashCard';
import { SwipeableCard } from './SwipeableCard';
import { Question } from '@/types'; 
import { generateUniqueRandomNumbers } from '@/utils'; 
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const STACK_SIZE = 3; // Render the top 3 cards at any time
const CARDS_TO_LOAD_IMAGES = 2; // Only load images for top 2 cards

type MoveableProps = {
  questions: Question[];
  subjectColor?: string;
};

const Moveable = ({ questions, subjectColor = '#906D88' }: MoveableProps) => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [showAnswer, setShowAnswer] = useState<Record<number, boolean>>({});

  const randomImageNumbers = useRef(generateUniqueRandomNumbers(questions.length, 500)).current;

  const handleCardSwiped = useCallback(() => {
    setQuestionNumber((prev) => prev + 1);
    setShowAnswer((prev) => {
      const newState = { ...prev };
      delete newState[questionNumber];
      return newState;
    });
  }, [questionNumber]);

  const handleReveal = useCallback((cardIndex: number) => {
    setShowAnswer((prev) => ({
      ...prev,
      [cardIndex]: !prev[cardIndex],
    }));
  }, []);
  
  // === STYLES FOR BACK CARDS (No animation, just positioning) ===
  const getBackCardStyle = (depth: number) => {
    // Second card (depth 1) stays full size, cards behind it scale down
    const scale = depth === 1 ? 1 : depth === 2 ? 0.95 : 0.8;
    const translateY = depth === 1 ? 0 : (depth - 1) * 10;
    const opacity = depth === 1 ? 0.8 : depth === 2 ? 0.65 : 0.5;

    return {
      zIndex: 50 - depth, // Lower zIndex than top card (100)
      transform: [{ scale: scale }, { translateY: translateY }],
      opacity: opacity,
    };
  };

  const resetTest = () => {
    setQuestionNumber(0);
    setShowAnswer({});
  };

  // --- RENDER STACK ---
  const renderCards = () => {
    if (questionNumber >= questions.length) {
      return (
        <Pressable
          onPress={resetTest}
          style={{ ...styles.resetButton, backgroundColor: subjectColor }}>
          <MaterialCommunityIcons name="refresh" size={18} color="white" />
          <Text style={styles.resetButtonText}>Start again</Text>
        </Pressable>
      );
    }
    
    // Create an array of card indices to render, starting from questionNumber
    const cardsToRender = [];
    for (let i = 0; i < STACK_SIZE; i++) {
        if (questionNumber + i < questions.length) {
            cardsToRender.push(questionNumber + i);
        }
    }

    // Render back cards first (bottom to top), then top card last
    const cards = [];
    
    // Render back cards (depth 1, 2, 3...)
    for (let i = cardsToRender.length - 1; i >= 1; i--) {
      const index = cardsToRender[i];
      const card = questions[index];
      const depth = i;
      const shouldLoadImage = depth < CARDS_TO_LOAD_IMAGES;
      
      cards.push(
        <View 
          key={`card-${index}`} 
          style={[styles.cardContainer, getBackCardStyle(depth)]}
        >
          <FlashCard
            question={card}
            randomImageId={randomImageNumbers[index]}
            showAnswer={false} 
            handleReveal={() => {}} 
            subjectColor={subjectColor}
            shouldLoadImage={shouldLoadImage}
          />
        </View>
      );
    }
    
    // Render top card last (so it's on top in DOM)
    if (cardsToRender.length > 0) {
      const index = cardsToRender[0];
      const card = questions[index];
      const shouldLoadImage = true;
      
      cards.push(
        <SwipeableCard
          key={`card-${index}`}
          question={card}
          randomImageId={randomImageNumbers[index]}
          showAnswer={showAnswer[index] || false}
          handleReveal={() => handleReveal(index)}
          subjectColor={subjectColor}
          shouldLoadImage={shouldLoadImage}
          onSwipe={handleCardSwiped}
          style={[styles.cardContainer, { zIndex: 100 }]}
        />
      );
    }
    
    return cards;
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {renderCards()}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
  },
  cardContainer: {
    position: 'absolute', 
    width: SCREEN_WIDTH * 0.9,
    height: Dimensions.get('screen').height * 0.6, 
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: 'white', 
  },
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