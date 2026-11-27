import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function ResourceDetailScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 10 }}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lecteur de document</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.pdfContainer}>
        <Ionicons name="document-text" size={80} color={colors.primary} />
        <Text style={styles.pdfText}>Document PDF (ID: {id})</Text>
        <Text style={styles.pdfSubtext}>Le contenu s'afficherait ici.</Text>
      </View>

      <TouchableOpacity style={styles.downloadButton}>
        <LinearGradient colors={[colors.primary, '#3B3DF5']} style={styles.gradient}>
          <Ionicons name="download" size={20} color="#FFF" />
          <Text style={styles.downloadText}>Télécharger la ressource</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text },
    pdfContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.card,
      margin: 20,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    pdfText: { color: colors.text, fontSize: 18, fontWeight: 'bold', marginTop: 20 },
    pdfSubtext: { color: colors.textGray, fontSize: 14, marginTop: 10 },
    downloadButton: { margin: 20, borderRadius: 12, overflow: 'hidden' },
    gradient: {
      flexDirection: 'row',
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    downloadText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  });
