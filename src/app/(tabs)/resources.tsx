import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { MOCK_RESSOURCES, MOCK_DELEGATES } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { useMessages } from '../../context/MessageContext';
import SkeletonLoader from '../../components/SkeletonLoader';

export default function ResourcesScreen() {
  const { colors } = useTheme();
  const { userRole, specialty } = useUser();
  const { createConversation } = useMessages();
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

  const handleSubmitResource = () => {
    if (!specialty) return;
    const delegate = MOCK_DELEGATES[specialty];
    const newConv = createConversation({
      id: `res-${Date.now()}`,
      type: 'resource',
      title: 'Nouvelle soumission de cours',
      participantName: delegate.name,
      specialty,
      submittedBy: 'Melyna Doe',
      status: 'pending',
    });
    router.push({ pathname: '/chat/[id]', params: { id: newConv.id } });
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
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

      {userRole === 'Étudiant' && specialty && (
        <TouchableOpacity onPress={handleSubmitResource} style={styles.submitBanner}>
          <Ionicons name="cloud-upload-outline" size={20} color={colors.primary} />
          <Text style={styles.submitBannerText}>
            Envoyer un cours à valider au Délégué {specialty}
          </Text>
          <Ionicons name="arrow-forward" size={18} color={colors.primary} />
        </TouchableOpacity>
      )}

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
    submitBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginHorizontal: 16,
      marginTop: 12,
      padding: 14,
      backgroundColor: colors.primary + '15',
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 12,
    },
    submitBannerText: { flex: 1, color: colors.primary, fontWeight: '600', fontSize: 13 },
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