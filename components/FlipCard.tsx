import React from 'react';
import { StyleSheet, View, Dimensions, Pressable, Text } from 'react-native';
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

function FlipCard() {
  const rotationF = useSharedValue(0);
  const rotationB = useSharedValue(180);
  const frontStyle = useAnimatedStyle(() => {
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotationF.value}deg` }],
    };
  });
  const backStyle = useAnimatedStyle(() => {
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotationB.value}deg` }],
    };
  });
  const onAnimate = () => {
    'worklet';
    if (rotationF.value === 180) {
      rotationF.value = withTiming(0, { duration: 200 });
      rotationB.value = withTiming(180, { duration: 200 });
      return;
    }
    rotationF.value = withTiming(180, { duration: 200 });
    rotationB.value = withTiming(360, { duration: 200 });
  };
  const animate = () => {
    runOnUI(onAnimate)();
  };
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Animated.View style={[frontStyle, styles.card]}>
          <View style={styles.cardContent}>
            <Text style={styles.titleText}>Front of Card</Text>
            <Text style={styles.bodyText}>This is a placeholder card component</Text>
          </View>
        </Animated.View>
        <Animated.View style={[backStyle, styles.card]}>
          <View style={styles.cardContent}>
            <Text style={styles.titleText}>Back of Card</Text>
            <Text style={styles.bodyText}>This is the answer side</Text>
          </View>
        </Animated.View>
      </View>
      <Pressable onPress={animate} style={styles.pressBtn}>
        <Text>Flip the Card</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    height: 300,
    width: Dimensions.get('screen').width * 0.9,
    position: 'relative',
  },
  card: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  pressBtn: {
    width: 120,
    height: 50,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default FlipCard;
