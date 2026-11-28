import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { useMessages } from '../../context/MessageContext';
import { useResources } from '../../context/ResourceContext';
import { MOCK_DELEGATES } from '../../data/mockData';
import SkeletonLoader from '../../components/SkeletonLoader';

const FILTERS = ['Tout', 'ISII', 'RSE'];

export default function ResourcesScreen() {
  const { colors } = useTheme();
  const { userRole, specialty, isDelegateMode } = useUser(); // ✅ Added isDelegateMode
  const { createConversation } = useMessages();
  const { resources } = useResources(); // ✅ Get resources from context
  const styles = getStyles(colors);

  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState('Tout'); // ✅ Filter state

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

  // ✅ Filter resources by specialty
  const filteredResources = resources.filter((r) => {
    if (activeFilter === 'Tout') return true;
    return r.specialty === activeFilter;
  });

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
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={styles.title}>{item.titre}</Text>
          <View style={[styles.badge, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>{item.specialty}</Text>
          </View>
        </View>
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

      {/* ✅ Filter Pills for ISII / RSE */}
      <View style={{ height: 50, marginTop: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterPill, { borderColor: colors.border }, activeFilter === f && { backgroundColor: colors.primary, borderColor: colors.primary }]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterText, { color: activeFilter === f ? '#FFF' : colors.textGray }]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Blue submission banner — only for students */}
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
        </View>
      ) : (
        <FlatList
          data={filteredResources}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* ✅ FAB (+) BUTTON FOR DELEGATES/ADMINS */}
      {isDelegateMode && (
        <TouchableOpacity
          style={[styles.fab, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/resource/create')}
        >
          <Ionicons name="add" size={30} color="#FFF" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: 20, paddingTop: 40, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: colors.text },
  filtersContainer: { paddingHorizontal: 16, alignItems: 'center', gap: 10 },
  filterPill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: colors.card, borderWidth: 1 },
  filterText: { fontSize: 14, fontWeight: '600' },
  submitBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 10, marginHorizontal: 16, marginTop: 12,
    padding: 14, backgroundColor: colors.primary + '15', borderWidth: 1, borderColor: colors.primary, borderRadius: 12,
  },
  submitBannerText: { flex: 1, color: colors.primary, fontWeight: '600', fontSize: 13 },
  card: { flexDirection: 'row', backgroundColor: colors.card, padding: 16, borderRadius: 12, marginBottom: 12, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  iconContainer: { marginRight: 15 },
  infoContainer: { flex: 1 },
  title: { color: colors.text, fontSize: 16, fontWeight: '600' },
  subtitle: { color: colors.textGray, fontSize: 13, marginTop: 4 },
  badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  badgeText: { fontSize: 10, fontWeight: 'bold' },
  fab: {
    position: 'absolute', bottom: 20, right: 20, width: 60, height: 60,
    borderRadius: 30, justifyContent: 'center', alignItems: 'center',
    elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3,
  },
});