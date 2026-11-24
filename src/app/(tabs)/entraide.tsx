import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

// Fausses données pour l'espace d'entraide
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
  {
    id: '3',
    titre: 'Cours de Réseaux (L3)',
    etat: 'Usé',
    proprietaire: 'Yasmine K.',
    icon: 'document-text',
  },
  {
    id: '4',
    titre: 'Matériel de dessin',
    etat: 'Neuf',
    proprietaire: 'Amine T.',
    icon: 'color-palette',
  },
];

export default function EntraideScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card}>
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
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Espace Entraide</Text>
        <Text style={styles.headerSubtitle}>Troc de matériel & livres</Text>
      </View>

      <FlatList
        data={MOCK_ENTRAIDE}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2} // Affiche sur 2 colonnes
        columnWrapperStyle={styles.row} // Espacement entre les colonnes
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Bouton flottant pour ajouter une annonce */}
      <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]}>
        <Ionicons name="add" size={30} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { padding: 20, paddingTop: 40, borderBottomWidth: 1, borderBottomColor: colors.border },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: colors.text },
    headerSubtitle: { fontSize: 13, color: colors.textGray, marginTop: 4 },
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
    ownerContainer: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    ownerText: { fontSize: 12, color: colors.textGray },
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
