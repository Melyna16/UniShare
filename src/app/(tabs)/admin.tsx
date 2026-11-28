import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { MOCK_USERS, AdminUser } from '../../data/mockData';

export default function AdminScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [users, setUsers] = useState<AdminUser[]>(MOCK_USERS);

  const toggleBan = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'banned' ? 'active' : 'banned' } : u));
  };

  const promoteToDelegate = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: 'Délégué', status: 'active' } : u));
  };

  const revokeDelegate = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: 'Étudiant' } : u));
  };

  const renderUser = ({ item }: { item: AdminUser }) => (
    <View style={[styles.userCard, item.status === 'banned' && { borderColor: colors.danger, borderWidth: 1 }]}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <View style={{ flexDirection: 'row', gap: 5, marginTop: 5 }}>
          <View style={[styles.badge, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>{item.role}</Text>
          </View>
          {item.specialty && (
            <View style={[styles.badge, { backgroundColor: colors.border }]}>
              <Text style={[styles.badgeText, { color: colors.text }]}>{item.specialty}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.actions}>
        {item.status === 'pending_delegate' && (
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.success }]} onPress={() => promoteToDelegate(item.id)}>
            <Ionicons name="checkmark" size={16} color="#FFF" />
          </TouchableOpacity>
        )}
        
        {item.role === 'Délégué' && (
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.textGray }]} onPress={() => revokeDelegate(item.id)}>
            <Ionicons name="arrow-down" size={16} color="#FFF" />
          </TouchableOpacity>
        )}

        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: item.status === 'banned' ? colors.success : colors.danger }]} onPress={() => toggleBan(item.id)}>
          <Ionicons name={item.status === 'banned' ? 'lock-open' : 'ban'} size={16} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard Admin</Text>
        <Text style={styles.headerSubtitle}>Gestion des utilisateurs</Text>
      </View>
      
      {/* AI Reports Summary Banner */}
      <View style={styles.alertBanner}>
        <Ionicons name="shield-half" size={24} color={colors.danger} />
        <Text style={styles.alertText}>1 signalement IA en attente (Spam)</Text>
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUser}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: 20, paddingTop: 40, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: colors.text },
  headerSubtitle: { fontSize: 14, color: colors.textGray, marginTop: 4 },
  alertBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.danger + '15', margin: 16, padding: 16, borderRadius: 12, gap: 10 },
  alertText: { color: colors.danger, fontWeight: 'bold' },
  userCard: { flexDirection: 'row', backgroundColor: colors.card, padding: 16, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: colors.border, alignItems: 'center' },
  userInfo: { flex: 1 },
  userName: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  userEmail: { fontSize: 12, color: colors.textGray },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  badgeText: { fontSize: 10, fontWeight: 'bold' },
  actions: { flexDirection: 'row', gap: 8 },
  actionBtn: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
});