import { StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Stack, useRouter, useLocalSearchParams, Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FAB from '@/components/FAB';

import { shuffleArray } from '@/utils';
import Moveable from '@/components/Moveable';
import { classes } from '@/data';

const subjectColors = {
  science: { primary: '#906D88', secondary: '#EEDAA6' },
  physics: { primary: '#005EB8', secondary: '#BBDEFB' },
  chemistry: { primary: '#2C7D4E', secondary: '#A8DADC' },
};

const Page = () => {
  const router = useRouter();

  const params = useLocalSearchParams();
  const { id, subject } = params;
  const classObj = classes.find((c) => c.id === id);
  const colors = subjectColors[subject as keyof typeof subjectColors] || subjectColors.science;

  if (!classObj) {
    return null;
  }

  const shuffledQuestions = shuffleArray(classObj.questions);
  return (
    <SafeAreaView
      style={{ backgroundColor: '#F2F5FC', flex: 1, justifyContent: 'space-between' }}
      edges={['top', 'bottom']}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTitle: `${classObj.subname}: ${classObj.className}`,
          headerLeft: () => (
            <Pressable onPress={router.back} style={{ padding: 8 }}>
              <MaterialCommunityIcons name="chevron-left" color="white" size={28} />
            </Pressable>
          ),
        }}
      />
      {classObj ? <Moveable questions={shuffledQuestions} subjectColor={colors.primary} /> : null}

      <Link href={{ pathname: `/class`, params: { id, subject } }} asChild>
        <FAB
          icon="book"
          style={[styles.fab, { backgroundColor: colors.primary }]}
          label="Study"
          color="white"
        />
      </Link>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 30,
    right: 0,
    bottom: 0,
  },
});
