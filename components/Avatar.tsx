import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type AvatarIconProps = {
  size: number;
  icon: string;
  style?: ViewStyle;
};

const AvatarIcon = ({ size, icon, style }: AvatarIconProps) => {
  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}>
      <MaterialCommunityIcons name={icon as any} size={size * 0.6} color="white" />
    </View>
  );
};

const Avatar = {
  Icon: AvatarIcon,
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Avatar;
