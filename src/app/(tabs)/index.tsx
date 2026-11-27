import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AnnouncementCard from '../../components/AnnouncementCard';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { useAnnouncements } from '../../context/AnnouncementContext'; // <-- Import

const FILTERS = ['Tout', 'Officiel', 'Urgent', 'Entraide'];

export default function AccueilScreen() {
  const { colors, theme, toggleTheme } = useTheme();
  const { isDelegateMode } = useUser();
  const { annonces } = useAnnouncements(); // <-- Récupération des annonces
  const styles = getStyles(colors);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tout');

  const filteredAnnonces = annonces.filter((annonce) => {
    // <-- Utilise "annonces"
    const matchesSearch =
      annonce.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      annonce.auteur.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesFilter = true;
    if (activeFilter === 'Officiel') matchesFilter = annonce.role !== 'Étudiant';
    if (activeFilter === 'Urgent') matchesFilter = annonce.type === 'urgent';
    if (activeFilter === 'Entraide') matchesFilter = annonce.type === 'entraide';
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>M</Text>
          </View>
          <Text style={styles.appName}>UniShare</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
            <TouchableOpacity onPress={toggleTheme}>
              <Ionicons
                name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'}
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>
            <TouchableOpacity
  onPress={() => router.push('/notifications')}
  activeOpacity={0.7}
>
  <Ionicons
    name="notifications-outline"
    size={24}
    color={colors.text}
  />
  <View
    style={[
      styles.notificationDot,
      { backgroundColor: colors.danger },
    ]}
  />
</TouchableOpacity>
          </View>
        </View>
        <Text style={styles.welcomeText}>Bonjour Melyna 👋</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.textGray} />
        <TextInput
          placeholder="Rechercher (IA)..."
          placeholderTextColor={colors.textGray}
          style={[styles.searchInput, { color: colors.text }]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="sparkles" size={20} color={colors.primary} />
      </View>

      <View style={{ height: 50 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterPill,
                { borderColor: colors.border },
                activeFilter === filter && {
                  backgroundColor: colors.primary,
                  borderColor: colors.primary,
                },
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: colors.textGray },
                  activeFilter === filter && { color: '#FFF' },
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredAnnonces} // <-- Utilise les données filtrées du contexte
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AnnouncementCard item={item} isDelegateMode={isDelegateMode} />}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ color: colors.textGray, textAlign: 'center', marginTop: 20 }}>
            Aucune annonce trouvée.
          </Text>
        }
      />

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => router.push('/post/create')}
      >
        <Ionicons name="add" size={30} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
    appName: { fontSize: 22, fontWeight: 'bold', color: colors.text },
    notificationDot: {
      position: 'absolute',
      top: 0,
      right: 2,
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    welcomeText: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 10 },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.inputBg,
      marginHorizontal: 20,
      paddingHorizontal: 15,
      borderRadius: 12,
      height: 50,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: colors.border,
    },
    searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
    filtersContainer: { paddingHorizontal: 20, alignItems: 'center', gap: 10 },
    filterPill: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: colors.card,
      borderWidth: 1,
    },
    filterText: { fontSize: 14, fontWeight: '600' },
    fab: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
     },
});
