import React from 'react';
import { Pressable, Text, View, StyleSheet, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type FABProps = {
  icon: string;
  label?: string;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  color?: string;
};

const FAB = ({ icon, label, onPress, style, color = 'white' }: FABProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.fab, { opacity: pressed ? 0.8 : 1 }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <MaterialCommunityIcons
          name={icon as any}
          size={24}
          color={color}
          style={label ? { marginRight: 8 } : undefined}
        />
        {label && <Text style={[styles.label, { color }]}>{label}</Text>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 28,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});

export default FAB;
