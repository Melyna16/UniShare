
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

export default function PrivacyScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const [settings, setSettings] = useState({
    visible: true,
    profileInfo: true,
    onlineStatus: false,
  });

  const options = [
    { key: 'visible', title: 'Profil visible', subtitle: 'Autoriser les autres étudiants à voir votre profil' },
    { key: 'profileInfo', title: 'Informations du profil', subtitle: 'Afficher vos informations aux autres utilisateurs' },
    { key: 'onlineStatus', title: 'Statut en ligne', subtitle: 'Afficher lorsque vous êtes connecté(e)' },
  ] as const;

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity style={s.header} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
        <Text style={[s.heading, { color: colors.text }]}>Confidentialité</Text>
      </TouchableOpacity>

      <Text style={[s.description, { color: colors.textGray }]}>
        Gérez la visibilité de vos informations personnelles.
      </Text>

      <View style={[s.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {options.map((option, index) => (
          <View key={option.key} style={[
            s.item,
            index !== options.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }
          ]}>
            <View style={{ flex: 1 }}>
              <Text style={[s.title, { color: colors.text }]}>{option.title}</Text>
              <Text style={[s.subtitle, { color: colors.textGray }]}>{option.subtitle}</Text>
            </View>
            <Switch
              value={settings[option.key]}
              onValueChange={(value) =>
                setSettings(prev => ({ ...prev, [option.key]: value }))
              }
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
        ))}
      </View>

      <View style={[s.info, { backgroundColor: colors.card }]}>
        <Ionicons name="shield-checkmark-outline" size={22} color={colors.primary} />
        <Text style={[s.infoText, { color: colors.textGray }]}>
          Vos informations sont importantes. UniShare doit respecter votre vie privée.
        </Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 18, paddingTop: 35, marginBottom: 25 },
  heading: { fontSize: 21, fontWeight: 'bold' },
  description: { fontSize: 14, lineHeight: 22, marginBottom: 22 },
  card: { borderWidth: 1, borderRadius: 16, overflow: 'hidden' },
  item: { flexDirection: 'row', alignItems: 'center', padding: 17 },
  title: { fontSize: 15, fontWeight: '600' },
  subtitle: { fontSize: 12, marginTop: 5, flex: 1 },
  info: { marginTop: 22, padding: 16, borderRadius: 12, flexDirection: 'row', gap: 12, alignItems: 'center' },
  infoText: { flex: 1, fontSize: 12, lineHeight: 19 },
});
