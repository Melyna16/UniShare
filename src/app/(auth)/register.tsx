import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '../../context/UserContext';
import { Specialty } from '../../data/mockData'; // <-- ✅ ADDED IMPORT

const ROLES = ['Étudiant', 'Délégué', 'Admin'];

export default function RegisterScreen() {
  const { colors } = useTheme();
  const { login } = useUser(); 
  const styles = getStyles(colors);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Étudiant');
  const [userSpecialty, setUserSpecialty] = useState<Specialty>('ISII'); // <-- ✅ ADDED STATE

  const handleRegister = () => {
    // ✅ UPDATED FUNCTION (now passes the second argument)
    login(role as any, role === 'Admin' ? null : userSpecialty);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <Text style={styles.title}>Créer un compte</Text>
        <Text style={styles.subtitle}>Rejoins la communauté UniShare</Text>

        {/* Role Selection */}
        <Text style={styles.label}>Je suis un(e) :</Text>
        <View style={styles.roleRow}>
          {ROLES.map((r) => (
            <TouchableOpacity
              key={r}
              style={[
                styles.roleBtn,
                { borderColor: colors.border },
                role === r && { backgroundColor: colors.primary, borderColor: colors.primary },
              ]}
              onPress={() => setRole(r)}
            >
              <Text style={[styles.roleText, { color: colors.textGray }, role === r && { color: '#FFF' }]}>
                {r}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ✅ ADDED: Specialty Selector (hidden for Admin) */}
        {role !== 'Admin' && (
          <>
            <Text style={styles.label}>Spécialité :</Text>
            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
              {(['ISII', 'RSE'] as Specialty[]).map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[
                    { flex: 1, paddingVertical: 12, borderRadius: 10, borderWidth: 1, alignItems: 'center', borderColor: colors.border },
                    userSpecialty === s && { backgroundColor: colors.primary, borderColor: colors.primary },
                  ]}
                  onPress={() => setUserSpecialty(s)}
                >
                  <Text style={{ color: userSpecialty === s ? '#FFF' : colors.text, fontWeight: 'bold' }}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Inputs */}
        <Text style={styles.label}>Nom complet</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color={colors.textGray} />
          <TextInput style={styles.input} placeholder="Melyna Doe" placeholderTextColor={colors.textGray} value={name} onChangeText={setName} />
        </View>

        <Text style={styles.label}>Email universitaire</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color={colors.textGray} />
          <TextInput style={styles.input} placeholder="ex: melyna@univ.dz" placeholderTextColor={colors.textGray} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        </View>

        <Text style={styles.label}>Mot de passe</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color={colors.textGray} />
          <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor={colors.textGray} value={password} onChangeText={setPassword} secureTextEntry />
        </View>

        {/* Submit Button */}
        <TouchableOpacity onPress={handleRegister} style={styles.buttonWrapper}>
          <LinearGradient colors={[colors.primary, '#3B3DF5']} style={styles.gradientButton}>
            <Text style={styles.buttonText}>S'inscrire</Text>
          </LinearGradient>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    scrollContent: { padding: 20, paddingTop: 40 },
    backButton: { marginBottom: 20, width: 40 },
    title: { fontSize: 28, fontWeight: 'bold', color: colors.text, marginBottom: 5 },
    subtitle: { fontSize: 16, color: colors.textGray, marginBottom: 30 },
    label: { color: colors.text, fontSize: 14, fontWeight: 'bold', marginBottom: 8, marginLeft: 4 },
    roleRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
    roleBtn: { flex: 1, paddingVertical: 12, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
    roleText: { fontSize: 14, fontWeight: 'bold' },
    inputContainer: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border,
      borderRadius: 12, paddingHorizontal: 15, height: 55, marginBottom: 20,
    },
    input: { flex: 1, marginLeft: 10, color: colors.text, fontSize: 16 },
    buttonWrapper: { borderRadius: 12, overflow: 'hidden', marginTop: 10 },
    gradientButton: { padding: 16, alignItems: 'center' },
    buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  });