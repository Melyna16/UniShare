import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

const MOCK_ENTRAIDE = [
  {
    id: '1',
    titre: 'Livre Algorithmique',
    etat: 'Bon état',
    proprietaire: 'Karim B.',
    icon: 'book',
  },
  {
    id: '2',
    titre: 'Calculatrice Casio',
    etat: 'Comme neuf',
    proprietaire: 'Sarah M.',
    icon: 'calculator',
  },
];

export default function EntraideScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      // ✅ CORRECTION ICI : Syntaxe objet pour TypeScript
      onPress={() => router.push({ pathname: '/chat/[id]', params: { id: item.id } })}
    >
      <View style={styles.imagePlaceholder}>
        <Ionicons name={item.icon as any} size={40} color={colors.primary} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.titre}
        </Text>
        <Text style={styles.cardCondition}>{item.etat}</Text>
        <View style={styles.ownerContainer}>
          <Ionicons name="person-circle-outline" size={14} color={colors.textGray} />
          <Text style={styles.ownerText} numberOfLines={1}>
            {item.proprietaire}
          </Text>
        </View>
        <View style={styles.contactButton}>
          <Ionicons name="chatbubble-outline" size={14} color="#FFF" />
          <Text style={styles.contactText}>Contacter</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Espace Entraide</Text>
      </View>
      <FlatList
        data={MOCK_ENTRAIDE}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { padding: 20, paddingTop: 40, borderBottomWidth: 1, borderBottomColor: colors.border },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: colors.text },
    row: { justifyContent: 'space-between' },
    card: {
      width: '48%',
      backgroundColor: colors.card,
      borderRadius: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    imagePlaceholder: {
      height: 100,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    cardContent: { padding: 12 },
    cardTitle: { fontSize: 14, fontWeight: 'bold', color: colors.text, marginBottom: 4 },
    cardCondition: { fontSize: 12, color: colors.primary, fontWeight: '600', marginBottom: 8 },
    ownerContainer: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 10 },
    ownerText: { fontSize: 12, color: colors.textGray },
    contactButton: {
      backgroundColor: colors.primary,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 6,
      borderRadius: 6,
      gap: 5,
    },
    contactText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  });
