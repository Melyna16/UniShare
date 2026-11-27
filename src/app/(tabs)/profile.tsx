import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext'; // <-- Import

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { isDelegateMode, toggleDelegateMode } = useUser(); // <-- Récupération de l'état
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mon Profil</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Carte d'identité */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>M</Text>
          </View>
          <Text style={styles.userName}>Melyna Doe</Text>
          <Text style={styles.userInfo}>M2 ISII • Université de Fac</Text>

          <View style={styles.badgeContainer}>
            <Ionicons name="shield-checkmark" size={16} color={colors.primary} />
            <Text style={styles.badgeText}>Étudiante Vérifiée</Text>
          </View>
        </View>

        {/* Statistiques */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Fichiers</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Échanges</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Annonces</Text>
          </View>
        </View>

        {/* BOUTON MODE DÉLÉGUÉ */}
        <TouchableOpacity
          style={[
            styles.delegateToggle,
            isDelegateMode && { backgroundColor: colors.primary, borderColor: colors.primary },
          ]}
          onPress={toggleDelegateMode}
        >
          <Ionicons
            name={isDelegateMode ? 'shield-checkmark' : 'shield-outline'}
            size={20}
            color={isDelegateMode ? '#FFF' : colors.text}
          />
          <Text
            style={[styles.delegateToggleText, { color: isDelegateMode ? '#FFF' : colors.text }]}
          >
            Mode Délégué {isDelegateMode ? 'ON' : 'OFF'}
          </Text>
          <Ionicons
            name={isDelegateMode ? 'toggle' : 'toggle-outline'}
            size={24}
            color={isDelegateMode ? '#FFF' : colors.textGray}
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>

        {/* Menu des paramètres */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={22} color={colors.text} />
            <Text style={styles.menuText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textGray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="lock-closed-outline" size={22} color={colors.text} />
            <Text style={styles.menuText}>Confidentialité</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textGray} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]}>
            <Ionicons name="help-circle-outline" size={22} color={colors.text} />
            <Text style={styles.menuText}>Aide & Support</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textGray} />
          </TouchableOpacity>
        </View>

        {/* Bouton Déconnexion */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color={colors.danger} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
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
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      paddingTop: 40,
    },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: colors.text },
    scrollContent: { padding: 20 },
    profileCard: { alignItems: 'center', marginBottom: 30 },
    avatarContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
    },
    avatarText: { color: '#FFF', fontSize: 40, fontWeight: 'bold' },
    userName: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 5 },
    userInfo: { fontSize: 14, color: colors.textGray, marginBottom: 10 },
    badgeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    badgeText: { color: colors.primary, fontSize: 12, fontWeight: 'bold', marginLeft: 5 },
    statsContainer: {
      flexDirection: 'row',
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      justifyContent: 'space-around',
      alignItems: 'center',
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    statBox: { alignItems: 'center' },
    statNumber: { fontSize: 20, fontWeight: 'bold', color: colors.text },
    statLabel: { fontSize: 12, color: colors.textGray, marginTop: 4 },
    statDivider: { width: 1, height: 30 },
    delegateToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      marginBottom: 30,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 10,
    },
    delegateToggleText: { fontSize: 16, fontWeight: 'bold' },
    menuContainer: {
      backgroundColor: colors.card,
      borderRadius: 16,
      marginBottom: 30,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    menuText: { flex: 1, marginLeft: 15, fontSize: 16, color: colors.text },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      borderRadius: 12,
      backgroundColor: colors.danger + '15',
      borderWidth: 1,
      borderColor: colors.danger,
    },
    logoutText: { color: colors.danger, fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  });
