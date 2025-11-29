import { StyleSheet, View, Text, Pressable } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FAB from '@/components/FAB';
import { SafeAreaView } from 'react-native-safe-area-context';
import { classes } from '@/data';
import { Stack, useRouter, useLocalSearchParams, Link } from 'expo-router';
import { FlashList } from '@shopify/flash-list';

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

  return (
    <SafeAreaView
      style={{ backgroundColor: '#F2F5FC', flex: 1, justifyContent: 'space-between' }}
      edges={['top']}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTitle: `${classObj?.subname}: ${classObj?.className}`,
          headerLeft: () => (
            <Pressable onPress={router.back} style={{ padding: 8 }}>
              <MaterialCommunityIcons name="chevron-left" color="white" size={28} />
            </Pressable>
          ),
        }}
      />
      {classObj ? (
        <FlashList
          data={classObj.questions}
          renderItem={({ item, index }) => (
            <View
              key={item.id}
              style={[styles.questionCard, { backgroundColor: colors.secondary + '30' }]}>
              <View style={styles.questionContent}>
                <View style={styles.numberContainer}>
                  <View style={[styles.numberBadge, { backgroundColor: colors.primary }]}>
                    <Text style={styles.numberText}>{index + 1}</Text>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.questionText}>{item.Q}</Text>
                  <Text style={styles.answerText}>{item.A}</Text>
                </View>
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : null}
      <Link href={{ pathname: `/test`, params: { id, subject } }} asChild>
        <FAB
          icon="lead-pencil"
          style={[styles.fab, { backgroundColor: colors.primary }]}
          label="Test"
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
  questionCard: {
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  questionContent: {
    flexDirection: 'row',
    padding: 16,
  },
  numberContainer: {
    justifyContent: 'flex-start',
    paddingRight: 10,
  },
  numberBadge: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  numberText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
  },
  answerText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
  },
  listContent: {
    paddingBottom: 100,
  },
});
