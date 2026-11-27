import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { MOCK_RESSOURCES } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';
import SkeletonLoader from '../../components/SkeletonLoader';

export default function ResourcesScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      // ✅ CORRECTION ICI : Syntaxe objet pour TypeScript
      onPress={() => router.push({ pathname: '/resource/[id]', params: { id: item.id } })}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="document-text" size={30} color={colors.primary} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.titre}</Text>
        <Text style={styles.subtitle}>
          {item.module} • {item.type} • {item.taille}
        </Text>
      </View>

      <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={{ padding: 10 }}>
        <Ionicons
          name={favorites.includes(item.id) ? 'bookmark' : 'bookmark-outline'}
          size={24}
          color={favorites.includes(item.id) ? colors.primary : colors.textGray}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ressources</Text>
      </View>

      {isLoading ? (
        <View style={{ padding: 16 }}>
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </View>
      ) : (
        <FlatList
          data={MOCK_RESSOURCES}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { padding: 20, paddingTop: 40, borderBottomWidth: 1, borderBottomColor: colors.border },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: colors.text },
    card: {
      flexDirection: 'row',
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    iconContainer: { marginRight: 15 },
    infoContainer: { flex: 1 },
    title: { color: colors.text, fontSize: 16, fontWeight: '600', marginBottom: 5 },
    subtitle: { color: colors.textGray, fontSize: 13 },
  });
