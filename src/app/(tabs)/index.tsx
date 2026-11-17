import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS } from '../../theme/colors';
import { MOCK_ANNONCES } from '../../data/mockData';
import { Ionicons } from '@expo/vector-icons';

export default function AccueilScreen() {
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons
          name={
            item.type === 'urgent'
              ? 'warning'
              : item.type === 'info'
                ? 'information-circle'
                : 'people'
          }
          size={20}
          color={item.type === 'urgent' ? COLORS.danger : COLORS.primary}
        />
        <Text style={styles.cardAuthor}>{item.auteur}</Text>
      </View>
      <Text style={styles.cardTitle}>{item.titre}</Text>
      <Text style={styles.cardDate}>{item.date}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          UniShare <Text style={{ color: COLORS.primary }}>Feed</Text>
        </Text>
      </View>
      <FlatList
        data={MOCK_ANNONCES}
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
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.text },
  card: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  cardAuthor: { color: COLORS.textGray, marginLeft: 8, fontSize: 14, fontWeight: '600' },
  cardTitle: { color: COLORS.text, fontSize: 16, marginBottom: 10 },
  cardDate: { color: COLORS.textGray, fontSize: 12 },
});
