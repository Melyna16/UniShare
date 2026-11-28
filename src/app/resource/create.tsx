import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useResources } from '../../context/ResourceContext';
import { Specialty } from '../../data/mockData';
import { LinearGradient } from 'expo-linear-gradient';

export default function CreateResourceScreen() {
  const { colors } = useTheme();
  const { addResource } = useResources();
  const styles = getStyles(colors);

  const [titre, setTitre] = useState('');
  const [module, setModule] = useState('');
  const [specialty, setSpecialty] = useState<Specialty>('ISII');

  const handlePublish = () => {
    if (titre.trim() === '' || module.trim() === '') {
      Alert.alert('Erreur', 'Veuillez remplir le titre et le module.');
      return;
    }
    addResource(titre, module, specialty);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 10 }}>
          <Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nouveau Cours</Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Spécialité</Text>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
          {(['ISII', 'RSE'] as Specialty[]).map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.roleBtn, { borderColor: colors.border }, specialty === s && { backgroundColor: colors.primary, borderColor: colors.primary }]}
              onPress={() => setSpecialty(s)}
            >
              <Text style={{ color: specialty === s ? '#FFF' : colors.text, fontWeight: 'bold' }}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Titre du cours</Text>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.card }]}
          placeholder="Ex: Cours de Réseaux Avancés"
          placeholderTextColor={colors.textGray}
          value={titre}
          onChangeText={setTitre}
        />

        <Text style={styles.label}>Module</Text>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.card }]}
          placeholder="Ex: Réseaux, IA, GL..."
          placeholderTextColor={colors.textGray}
          value={module}
          onChangeText={setModule}
        />

        <TouchableOpacity style={styles.publishBtn} onPress={handlePublish}>
          <LinearGradient colors={[colors.primary, '#3B3DF5']} style={styles.gradient}>
            <Ionicons name="cloud-upload" size={20} color="#FFF" />
            <Text style={styles.publishText}>Publier le cours</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  form: { padding: 20 },
  label: { color: colors.text, fontSize: 16, fontWeight: 'bold', marginBottom: 10, marginTop: 15 },
  roleBtn: { flex: 1, paddingVertical: 12, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  input: { borderWidth: 1, borderRadius: 12, padding: 15, fontSize: 16 },
  publishBtn: { marginTop: 30, borderRadius: 12, overflow: 'hidden' },
  gradient: { flexDirection: 'row', padding: 16, justifyContent: 'center', alignItems: 'center', gap: 10 },
  publishText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});