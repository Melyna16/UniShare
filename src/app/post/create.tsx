import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useAnnouncements } from '../../context/AnnouncementContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function CreatePostScreen() {
  const { colors } = useTheme();
  const { addAnnonce } = useAnnouncements();
  const styles = getStyles(colors);

  const [titre, setTitre] = useState('');
  const [contenu, setContenu] = useState('');
  const [type, setType] = useState<'info' | 'urgent' | 'entraide'>('info');

  // Fonction sécurisée pour quitter l'écran
  const handleClose = () => {
    if (router.canGoBack()) {
      router.back(); // Si on a un historique (mobile), on revient en arrière
    } else {
      router.replace('/(tabs)'); // Sinon (web/refresh), on force le retour à l'accueil
    }
  };

  const handlePublish = () => {
    if (titre.trim() === '') {
      Alert.alert('Erreur', 'Veuillez écrire un titre.');
      return;
    }

    addAnnonce(titre, type, contenu);
    handleClose(); // On utilise la fonction sécurisée ici aussi
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* On utilise handleClose ici pour le bouton X */}
        <TouchableOpacity onPress={handleClose} style={{ padding: 10 }}>
          <Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nouvelle Annonce</Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.label}>Catégorie</Text>
        <View style={styles.categoryRow}>
          {['info', 'urgent', 'entraide'].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryBtn,
                { borderColor: colors.border },
                type === cat && { backgroundColor: colors.primary, borderColor: colors.primary },
              ]}
              onPress={() => setType(cat as any)}
            >
              <Text
                style={[
                  styles.categoryText,
                  { color: colors.textGray },
                  type === cat && { color: '#FFF' },
                ]}
              >
                {cat.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Titre de l'annonce</Text>
        <TextInput
          style={[
            styles.input,
            { color: colors.text, borderColor: colors.border, backgroundColor: colors.card },
          ]}
          placeholder="Ex: Report du cours de Réseaux..."
          placeholderTextColor={colors.textGray}
          value={titre}
          onChangeText={setTitre}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[
            styles.input,
            styles.textArea,
            { color: colors.text, borderColor: colors.border, backgroundColor: colors.card },
          ]}
          placeholder="Ajoutez des détails (lieu, heure, informations complémentaires...)"
          placeholderTextColor={colors.textGray}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          value={contenu}
          onChangeText={setContenu}
        />

        <TouchableOpacity style={styles.publishBtn} onPress={handlePublish}>
          <LinearGradient colors={[colors.primary, '#3B3DF5']} style={styles.gradient}>
            <Ionicons name="send" size={20} color="#FFF" />
            <Text style={styles.publishText}>Publier l'annonce</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
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
    formContainer: { padding: 20 },
    label: {
      color: colors.text,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 15,
    },
    categoryRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
    categoryBtn: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 8,
      borderWidth: 1,
      alignItems: 'center',
    },
    categoryText: { fontWeight: 'bold', fontSize: 12 },
    input: { borderWidth: 1, borderRadius: 12, padding: 15, fontSize: 16 },
    textArea: { height: 100 },
    publishBtn: { marginTop: 30, borderRadius: 12, overflow: 'hidden' },
    gradient: {
      flexDirection: 'row',
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    publishText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  });
