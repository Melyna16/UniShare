import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

const FILTERS = ['Tout', 'Entraide', 'Ressources', 'Direct'] as const;

// ✅ Ajout de données locales pour remplacer le MessageContext manquant
const MOCK_CONVERSATIONS = [
  {
    id: '1',
    type: 'entraide',
    title: 'Livre Algorithmique',
    participantName: 'Karim B.',
    updatedAt: 'Il y a 2h',
    lastMessage: 'Salut ! Oui oui, je te le ramène demain.',
  },
  {
    id: '2',
    type: 'entraide',
    title: 'Calculatrice Casio',
    participantName: 'Sarah M.',
    updatedAt: 'Hier',
    lastMessage: 'Oui bien sûr, tu peux passer la récupérer.',
  },
];

export default function MessagesScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>('Tout');

  // On utilise les données locales au lieu du contexte manquant
  const conversations = MOCK_CONVERSATIONS;

  const filtered = conversations.filter((c) => {
    if (activeFilter === 'Tout') return true;
    if (activeFilter === 'Entraide') return c.type === 'entraide';
    if (activeFilter === 'Ressources') return c.type === 'resource';
    if (activeFilter === 'Direct') return c.type === 'direct';
    return true;
  });

  const getIcon = (type: string) => {
    if (type === 'entraide') return 'swap-horizontal';
    if (type === 'resource') return 'document-text';
    return 'chatbubbles';
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.chatRow}
      // ✅ CORRECTION : Le chemin pointe bien vers /entraide/chat/
      onPress={() => router.push({ pathname: '/entraide/chat/[id]', params: { id: item.id } })}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={getIcon(item.type) as any} size={22} color={colors.primary} />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.topRow}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.time}>{item.updatedAt}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={styles.participant}>{item.participantName}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage || 'Nouvelle conversation'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      <View style={{ height: 50 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterPill,
                { borderColor: colors.border },
                activeFilter === f && {
                  backgroundColor: colors.primary,
                  borderColor: colors.primary,
                },
              ]}
              onPress={() => setActiveFilter(f)}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: activeFilter === f ? '#FFF' : colors.textGray },
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={{ color: colors.textGray, textAlign: 'center', marginTop: 30 }}>
            Aucune conversation.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { padding: 20, paddingTop: 40, borderBottomWidth: 1, borderBottomColor: colors.border },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: colors.text },
    filtersContainer: { paddingHorizontal: 20, alignItems: 'center', gap: 10 },
    filterPill: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: colors.card,
      borderWidth: 1,
    },
    filterText: { fontSize: 14, fontWeight: '600' },
    chatRow: {
      flexDirection: 'row',
      padding: 15,
      backgroundColor: colors.card,
      borderRadius: 12,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    textContainer: { flex: 1 },
    topRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    title: { fontSize: 15, fontWeight: 'bold', color: colors.text, flex: 1 },
    time: { fontSize: 11, color: colors.textGray },
    participant: { fontSize: 13, color: colors.primary, fontWeight: '600' },
    lastMessage: { fontSize: 13, color: colors.textGray, marginTop: 4 },
  });
