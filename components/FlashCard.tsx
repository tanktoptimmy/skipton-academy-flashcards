import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Question } from '@/types';

const { width } = Dimensions.get('screen');

function FlashCard({
  question,
  randomImageId,
  showAnswer,
  handleReveal,
  subjectColor = '#005EB8',
}: {
  question: Question;
  randomImageId: number;
  showAnswer: boolean;
  handleReveal: () => void;
  subjectColor?: string;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.questionSection}>
        <Text style={styles.questionText}>{question.Q}</Text>
      </View>
      <View style={styles.contentSection}>
        {showAnswer ? (
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>{question.A}</Text>
          </View>
        ) : (
          <Image
            source={{ uri: `https://picsum.photos/id/${randomImageId}/400/300` }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleReveal}
          style={{ ...styles.button, backgroundColor: subjectColor }}>
          <MaterialCommunityIcons
            name={showAnswer ? 'eye-off' : 'eye'}
            size={18}
            color="white"
          />
          <Text style={styles.buttonText}>
            {showAnswer ? 'Hide answer' : 'Reveal answer'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  questionSection: {
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#f0f0f0',
  },
  questionText: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
  },
  contentSection: {
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  answerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  answerText: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: '#555',
    lineHeight: 24,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  buttonContainer: {
    paddingTop: 16,
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: 'white',
  },
});

export default FlashCard;
