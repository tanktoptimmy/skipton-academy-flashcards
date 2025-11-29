import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Modal, Pressable, StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ClassButton from '@/components/ClassButton';

import { classes } from '@/data';

export const Home = () => {
  const [chosenSubject, setChosenSubject] = useState('science');
  const [visible, setVisible] = React.useState(false);

  const openModal = () => setVisible(true);

  const closeModal = () => setVisible(false);

  // Get unique subjects
  const subjects = Array.from(new Set(classes.map((cl) => cl.subject)));

  const grid = classes.filter((cl) => cl.subject === chosenSubject);

  const subjectColors = {
    science: { primary: '#906D88', secondary: '#EEDAA6' },
    physics: { primary: '#005EB8', secondary: '#BBDEFB' },
    chemistry: { primary: '#2C7D4E', secondary: '#A8DADC' },
  };

  const currentColors =
    subjectColors[chosenSubject as keyof typeof subjectColors] || subjectColors.science;
  return (
    <>
      <View style={{ backgroundColor: currentColors.primary }}>
        <SafeAreaView edges={['top']} />
      </View>
      <SafeAreaView style={[styles.container, { backgroundColor: '#F2F5FC' }]} edges={[]}>
        <StatusBar backgroundColor={currentColors.primary} barStyle="light-content" />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
      <Modal visible={visible} onRequestClose={closeModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Choose a Subject</Text>
            <View style={styles.subjectList}>
              {subjects.map((subject) => {
                const subColor = subjectColors[subject as keyof typeof subjectColors];
                const isSelected = chosenSubject === subject;
                return (
                  <Pressable
                    key={subject}
                    onPress={() => {
                      setChosenSubject(subject);
                      closeModal();
                    }}
                    style={{
                      ...styles.modalSubjectButton,
                      backgroundColor: isSelected ? subColor?.primary : '#E8E8E8',
                    }}>
                    <Text
                      style={{
                        ...styles.modalSubjectButtonText,
                        color: isSelected ? 'white' : subColor?.primary,
                      }}>
                      {subject.charAt(0).toUpperCase() + subject.slice(1)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={[
          styles.topContainer,
          {
            backgroundColor: currentColors.primary,
          },
        ]}>
        <View style={styles.subjectButtonContainer}>
          <Text style={{ ...styles.subjectLabel, color: currentColors.secondary }}>
            Current Subject:
          </Text>
          <Pressable
            onPress={openModal}
            style={{ ...styles.subjectButton, backgroundColor: currentColors.secondary }}>
            <MaterialCommunityIcons name="swap-horizontal" size={20} color={currentColors.primary} />
            <Text style={{ ...styles.subjectButtonText, color: currentColors.primary }}>
              {chosenSubject.charAt(0).toUpperCase() + chosenSubject.slice(1)}
            </Text>
          </Pressable>
        </View>
        <View>
          <Text style={{ ...styles.secondaryTitleText, color: currentColors.secondary }}>
            Hello Isabelle,
          </Text>
          <Text style={{ ...styles.primaryTitleText, color: 'white' }}>Choose your class...</Text>
        </View>
      </View>

      <Text style={styles.title}>Your Classes</Text>
      <FlatList
        style={{ paddingHorizontal: 10 }}
        data={grid}
        renderItem={({ item }) => <ClassButton {...item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          gap: 6,
          paddingBottom: 100,
        }}
      />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  topContainer: {
    height: 230,
    paddingHorizontal: 28,
    paddingTop: 20,
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  subjectButtonContainer: {
    gap: 8,
  },
  subjectLabel: {
    fontFamily: 'RedHatDisplay_700Bold',
    fontSize: 14,
  },
  subjectButton: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  subjectButtonText: {
    fontFamily: 'RedHatDisplay_700Bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  secondaryTitleText: {
    fontFamily: 'RedHatDisplay_700Bold',
    fontSize: 22,
  },
  primaryTitleText: {
    fontFamily: 'RedHatDisplay_700Bold',
    fontSize: 30,
  },
  title: {
    fontFamily: 'RedHatDisplay_700Bold',
    fontSize: 20,
    color: '#494D5E',
    paddingHorizontal: 26,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'RedHatDisplay_700Bold',
    marginBottom: 16,
  },
  subjectList: {
    gap: 10,
    paddingVertical: 10,
  },
  modalSubjectButton: {
    marginVertical: 5,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  modalSubjectButtonText: {
    fontFamily: 'RedHatDisplay_700Bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default Home;
