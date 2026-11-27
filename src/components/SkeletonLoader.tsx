import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function SkeletonLoader() {
  const { colors } = useTheme();
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View style={[styles.card, { backgroundColor: colors.card, opacity }]}>
      <View style={[styles.icon, { backgroundColor: colors.border }]} />
      <View style={styles.textContainer}>
        <View style={[styles.title, { backgroundColor: colors.border }]} />
        <View style={[styles.subtitle, { backgroundColor: colors.border }]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  icon: { width: 40, height: 40, borderRadius: 8, marginRight: 15 },
  textContainer: { flex: 1 },
  title: { width: '70%', height: 16, borderRadius: 4, marginBottom: 8 },
  subtitle: { width: '40%', height: 12, borderRadius: 4 },
});
