import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_RESSOURCES } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';

export default function ResourcesScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name="document-text" size={30} color={colors.primary} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.titre}</Text>
        <Text style={styles.subtitle}>
          {item.module} • {item.type} • {item.taille}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ressources</Text>
      </View>
      <FlatList
        data={MOCK_RESSOURCES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// Styles dynamiques basés sur le thème
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
