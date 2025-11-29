import { ImageSourcePropType, View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import Avatar from '@/components/Avatar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type ClassButtonProps = {
  subject: string;
  className: string;
  subname: string;
  icon: ImageSourcePropType;
  id: string;
  subjectPrimaryColour?: string;
  subjectSecondaryColour?: string;
};

const subjectColors = {
  science: { primary: '#906D88', secondary: '#EEDAA6' },
  physics: { primary: '#005EB8', secondary: '#BBDEFB' },
  chemistry: { primary: '#2C7D4E', secondary: '#A8DADC' },
};

const subjectIcons = {
  science: 'microscope',
  physics: 'atom',
  chemistry: 'flask',
};

const ClassButton = ({
  id,
  className,
  subname,
  subject,
  subjectPrimaryColour,
}: ClassButtonProps) => {
  const colors = subjectColors[subject as keyof typeof subjectColors] || subjectColors.science;
  const icon = subjectIcons[subject as keyof typeof subjectIcons] || 'book';
  const primaryColor = subjectPrimaryColour || colors.primary;

  return (
    <View key={id} style={[styles.card, { backgroundColor: colors.secondary + '40' }]}>
      <View style={styles.cardHeader}>
        <Avatar.Icon size={48} icon={icon} style={{ backgroundColor: primaryColor }} />
        <View style={styles.cardTitles}>
          <Text style={styles.cardTitle}>{className}</Text>
          <Text style={styles.cardSubtitle}>{subname}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.cardActions}>
        <Link href={{ pathname: `/test`, params: { id, subject } }} asChild>
          <Pressable
            style={{
              ...styles.button,
              backgroundColor: primaryColor,
            }}>
            <MaterialCommunityIcons name="pencil" size={18} color="white" />
            <Text style={{ ...styles.buttonText, color: 'white' }}>Test</Text>
          </Pressable>
        </Link>
        <Link href={{ pathname: `/class`, params: { id, subject } }} asChild>
          <Pressable
            style={{
              ...styles.button,
              ...styles.outlinedButton,
              borderColor: primaryColor,
            }}>
            <MaterialCommunityIcons name="book" size={18} color={primaryColor} />
            <Text style={{ ...styles.buttonText, color: primaryColor }}>Study</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  cardTitles: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'RedHatDisplay_700Bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 15,
    color: '#6B7280',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 40,
    backgroundColor: 'red'
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default ClassButton;
