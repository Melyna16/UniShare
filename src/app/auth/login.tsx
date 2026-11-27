import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '../../context/UserContext'; // <-- Added

export default function LoginScreen() {
  const { colors } = useTheme();
  const { login } = useUser(); // <-- Added
  const styles = getStyles(colors);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Added state to test different roles:
  const [loginRole, setLoginRole] = useState<'Étudiant' | 'Délégué' | 'Admin'>('Étudiant');

  const handleLogin = () => {
    // We log in with the selected role. 
    // The _layout.tsx will automatically redirect to (tabs)!
    login(loginRole); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        
        {/* Header Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="school" size={50} color={colors.primary} />
          </View>
          <Text style={styles.appName}>UniShare</Text>
          <Text style={styles.subtitle}>Connecte-toi à ton campus</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Email universitaire</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color={colors.textGray} />
            <TextInput
              style={styles.input}
              placeholder="ex: melyna@univ.dz"
              placeholderTextColor={colors.textGray}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.label}>Mot de passe</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color={colors.textGray} />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={colors.textGray}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>

          {/* 👇 ROLE SELECTOR (Only for testing) 👇 */}
          <Text style={styles.label}>Se connecter en tant que :</Text>
          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
            {['Étudiant', 'Délégué', 'Admin'].map((r) => (
              <TouchableOpacity
                key={r}
                style={[
                  { flex: 1, padding: 10, borderWidth: 1, borderRadius: 8, alignItems: 'center', borderColor: colors.border },
                  loginRole === r && { backgroundColor: colors.primary, borderColor: colors.primary }
                ]}
                onPress={() => setLoginRole(r as any)}
              >
                <Text style={{ color: loginRole === r ? '#FFF' : colors.text, fontWeight: 'bold' }}>{r}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* 👆 END OF ROLE SELECTOR 👆 */}

          {/* Login Button */}
          <TouchableOpacity onPress={handleLogin} style={styles.buttonWrapper}>
            <LinearGradient colors={[colors.primary, '#3B3DF5']} style={styles.gradientButton}>
              <Text style={styles.buttonText}>Se connecter</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Register Link */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Pas encore de compte ? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/register')}>
              <Text style={styles.registerLink}>S'inscrire</Text>
            </TouchableOpacity>
          </View>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    keyboardView: { flex: 1, justifyContent: 'center', padding: 20 },
    logoContainer: { alignItems: 'center', marginBottom: 40 },
    iconCircle: {
      width: 100, height: 100, borderRadius: 50,
      backgroundColor: colors.card, justifyContent: 'center', alignItems: 'center',
      marginBottom: 15, borderWidth: 2, borderColor: colors.primary
    },
    appName: { fontSize: 32, fontWeight: 'bold', color: colors.text, marginBottom: 5 },
    subtitle: { fontSize: 16, color: colors.textGray },
    formContainer: { width: '100%' },
    label: { color: colors.text, fontSize: 14, fontWeight: 'bold', marginBottom: 8, marginLeft: 4 },
    inputContainer: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border,
      borderRadius: 12, paddingHorizontal: 15, height: 55, marginBottom: 20,
    },
    input: { flex: 1, marginLeft: 10, color: colors.text, fontSize: 16 },
    forgotPassword: { alignSelf: 'flex-end', marginBottom: 25 },
    forgotText: { color: colors.primary, fontSize: 14 },
    buttonWrapper: { borderRadius: 12, overflow: 'hidden', elevation: 3 },
    gradientButton: { padding: 16, alignItems: 'center' },
    buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
    registerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
    registerText: { color: colors.textGray, fontSize: 14 },
    registerLink: { color: colors.primary, fontSize: 14, fontWeight: 'bold' },
  });