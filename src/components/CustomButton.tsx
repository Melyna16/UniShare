import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../theme/colors';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
}

export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
  loading = false,
}: CustomButtonProps) {
  const getBackgroundColor = () => {
    if (variant === 'secondary') return COLORS.card;
    if (variant === 'danger') return COLORS.danger;
    return COLORS.primary;
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: getBackgroundColor() }]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.text} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
