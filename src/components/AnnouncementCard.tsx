import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface AnnouncementCardProps {
  item: any;
  isDelegateMode: boolean;
}

export default function AnnouncementCard({ item, isDelegateMode }: AnnouncementCardProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const showAIModeration = isDelegateMode && item.isSuspect;

  return (
    <View style={[styles.card, showAIModeration && styles.cardSuspect]}>
      {/* En-tête */}
      <View style={styles.cardHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name={
              item.type === 'urgent'
                ? 'warning'
                : item.type === 'info'
                  ? 'information-circle'
                  : 'people'
            }
            size={20}
            color={item.type === 'urgent' ? colors.danger : colors.primary}
          />
          <Text style={styles.cardAuthor}>{item.auteur}</Text>
          <View
            style={[
              styles.roleBadge,
              { backgroundColor: item.role === 'Étudiant' ? colors.border : colors.primary },
            ]}
          >
            <Text
              style={[styles.roleText, { color: item.role === 'Étudiant' ? colors.text : '#FFF' }]}
            >
              {item.role}
            </Text>
          </View>
        </View>
        <Text style={styles.cardDate}>{item.date}</Text>
      </View>

      {/* Contenu */}
      <Text style={styles.cardTitle}>{item.titre}</Text>

      {/* Modération IA */}
      {showAIModeration && (
        <View style={styles.aiBox}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Ionicons name="shield-half" size={24} color={colors.danger} />
            <Text style={[styles.aiText, { color: colors.danger }]}>
              Alerte IA : Score de risque {item.riskScore}%
            </Text>
          </View>
          <Text style={[styles.aiSubText, { color: colors.textGray }]}>
            Contenu potentiellement dangereux (Spam/Phishing).
          </Text>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
            <TouchableOpacity style={[styles.aiButton, { backgroundColor: colors.success }]}>
              <Text style={styles.aiButtonText}>Approuver</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.aiButton, { backgroundColor: colors.danger }]}>
              <Text style={styles.aiButtonText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Actions */}
      <View style={[styles.actionBar, { borderTopColor: colors.border }]}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="heart-outline" size={20} color={colors.textGray} />
          <Text style={[styles.actionText, { color: colors.textGray }]}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={18} color={colors.textGray} />
          <Text style={[styles.actionText, { color: colors.textGray }]}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-social-outline" size={20} color={colors.textGray} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles dynamiques
const getStyles = (colors: any) =>
  StyleSheet.create({
    card: { backgroundColor: colors.card, padding: 16, borderRadius: 12, marginBottom: 16 },
    cardSuspect: { borderColor: colors.danger, borderWidth: 1 },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    cardAuthor: { color: colors.text, marginLeft: 8, fontSize: 14, fontWeight: '600' },
    roleBadge: { marginLeft: 8, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    roleText: { fontSize: 10, fontWeight: 'bold' },
    cardDate: { color: colors.textGray, fontSize: 12 },
    cardTitle: { color: colors.text, fontSize: 16, marginBottom: 15, lineHeight: 22 },
    aiBox: {
      backgroundColor: colors.danger + '15',
      padding: 12,
      borderRadius: 8,
      marginBottom: 15,
    },
    aiText: { fontWeight: 'bold', marginLeft: 8 },
    aiSubText: { fontSize: 12 },
    aiButton: { flex: 1, padding: 10, borderRadius: 6, alignItems: 'center' },
    aiButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
    actionBar: { flexDirection: 'row', borderTopWidth: 1, paddingTop: 12, gap: 20 },
    actionButton: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    actionText: { fontSize: 14 },
  });
