
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

export default function SettingsScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const sections = [
    {
      title: 'Notifications',
      subtitle: 'Gérer vos notifications',
      icon: 'notifications-outline',
      route: '/settings/notifications',
    },
    {
      title: 'Confidentialité',
      subtitle: 'Gérer votre vie privée',
      icon: 'lock-closed-outline',
      route: '/settings/privacy',
    },
    {
      title: 'Aide & Support',
      subtitle: 'FAQ et assistance',
      icon: 'help-circle-outline',
      route: '/settings/support',
    },
  ] as const;

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[s.heading, { color: colors.text }]}>Paramètres</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={[s.sectionTitle, { color: colors.textGray }]}>
          PERSONNALISATION
        </Text>

        <View style={[s.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {sections.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              activeOpacity={0.7}
              onPress={() => router.push(item.route)}
              style={[
                s.item,
                index !== sections.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
              ]}
            >
              <View style={[s.iconBox, { backgroundColor: colors.primary + '20' }]}>
                <Ionicons name={item.icon} size={22} color={colors.primary} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={[s.itemTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[s.subtitle, { color: colors.textGray }]}>{item.subtitle}</Text>
              </View>

              <Ionicons name="chevron-forward" size={20} color={colors.textGray} />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[s.sectionTitle, { color: colors.textGray, marginTop: 28 }]}>
          APPLICATION
        </Text>

        <View style={[s.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={s.item}>
            <Ionicons name="information-circle-outline" size={23} color={colors.primary} />
            <Text style={[s.itemTitle, { color: colors.text, flex: 1, marginLeft: 14 }]}>
              À propos de UniShare
            </Text>
            <Text style={{ color: colors.textGray, fontSize: 12 }}>v1.0.0</Text>
          </View>
        </View>

        <Text style={[s.footer, { color: colors.textGray }]}>
          UniShare • Partager, apprendre et réussir ensemble.
        </Text>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', padding: 20, paddingTop: 55,
  },
  heading: { fontSize: 21, fontWeight: 'bold' },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', marginBottom: 12, letterSpacing: 1 },
  card: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  item: {
    flexDirection: 'row', alignItems: 'center',
    padding: 16, gap: 14,
  },
  iconBox: {
    width: 42, height: 42, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  itemTitle: { fontSize: 15, fontWeight: '600' },
  subtitle: { fontSize: 12, marginTop: 4 },
  footer: { textAlign: 'center', marginTop: 35, fontSize: 12 },
});
