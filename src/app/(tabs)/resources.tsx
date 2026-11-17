import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS } from '../../theme/colors';
import { MOCK_RESSOURCES } from '../../data/mockData';
import { Ionicons } from '@expo/vector-icons';

export default function ResourcesScreen() {
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name="document-text" size={30} color={COLORS.primary} />
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 20, paddingTop: 40, borderBottomWidth: 1, borderBottomColor: COLORS.card },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  iconContainer: { marginRight: 15 },
  infoContainer: { flex: 1 },
  title: { color: COLORS.text, fontSize: 16, fontWeight: '600', marginBottom: 5 },
  subtitle: { color: COLORS.textGray, fontSize: 13 },
});
