
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

export default function SupportScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const faqs = [
    {
      question: 'Comment partager un fichier ?',
      answer: 'Accédez à la section Ressources pour partager vos documents.',
    },
    {
      question: 'Comment demander un échange ?',
      answer: 'Consultez les annonces et contactez leur auteur pour proposer un échange.',
    },
    {
      question: 'Comment modifier mon profil ?',
      answer: 'Accédez à votre profil pour consulter les informations disponibles.',
    },
  ];

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity style={s.header} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
        <Text style={[s.heading, { color: colors.text }]}>Aide & Support</Text>
      </TouchableOpacity>

      <Text style={[s.description, { color: colors.textGray }]}>
        Retrouvez les réponses aux questions fréquentes.
      </Text>

      {faqs.map((faq, index) => (
        <TouchableOpacity
          key={index}
          style={[s.card, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => Alert.alert(faq.question, faq.answer)}
        >
          <Text style={[s.question, { color: colors.text }]}>{faq.question}</Text>
          <Ionicons name="chevron-forward" color={colors.textGray} size={20} />
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[s.contact, { backgroundColor: colors.primary }]}
        onPress={() => Linking.openURL('mailto:support@unishare.com')}
      >
        <Ionicons name="mail-outline" color="#FFF" size={20} />
        <Text style={s.contactText}>Contacter le support</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 18, paddingTop: 35, marginBottom: 25 },
  heading: { fontSize: 21, fontWeight: 'bold' },
  description: { fontSize: 14, marginBottom: 22 },
  card: {
    borderWidth: 1, borderRadius: 12, padding: 17,
    marginBottom: 12, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between',
  },
  question: { fontSize: 14, fontWeight: '600', flex: 1 },
  contact: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', padding: 16,
    borderRadius: 12, marginTop: 25, gap: 10,
  },
  contactText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
});
