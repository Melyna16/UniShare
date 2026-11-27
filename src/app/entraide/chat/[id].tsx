import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../../context/ThemeContext';

const MOCK_CHATS: Record<string, any[]> = {
  '1': [
    { id: '1', text: 'Salut Karim ! Le livre est toujours dispo ?', sender: 'me' },
    { id: '2', text: 'Salut ! Oui oui, je te le ramène demain en cours.', sender: 'other' },
  ],
  '2': [
    { id: '1', text: 'Salut ! La calculatrice est toujours disponible ?', sender: 'me' },
    {
      id: '2',
      text: 'Oui bien sûr, tu peux passer la récupérer à la bibliothèque.',
      sender: 'other',
    },
  ],
};

export default function ChatScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const { id } = useLocalSearchParams();

  // ✅ CORRECTION ICI : On ajoute || '' pour garantir que c'est toujours un string
  const itemId = (Array.isArray(id) ? id[0] : id) || '';

  const [messages, setMessages] = useState(
    MOCK_CHATS[itemId] || [{ id: '1', text: 'Début de la discussion...', sender: 'other' }]
  );

  const [input, setInput] = useState('');

  const chatName = itemId === '1' ? 'Karim B.' : itemId === '2' ? 'Sarah M.' : 'Utilisateur';

  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { id: Date.now().toString(), text: input, sender: 'me' }]);
    setInput('');
  };

  const renderMessage = ({ item }: { item: any }) => (
    <View
      style={[styles.messageBubble, item.sender === 'me' ? styles.myMessage : styles.otherMessage]}
    >
      <Text
        style={[
          styles.messageText,
          item.sender === 'me' ? { color: '#FFF' } : { color: colors.text },
        ]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 10 }}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Discussion avec {chatName}</Text>
        <View style={{ width: 44 }} />
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ padding: 16 }}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Écrire un message..."
            placeholderTextColor={colors.textGray}
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    messageBubble: { padding: 12, borderRadius: 16, marginBottom: 10, maxWidth: '80%' },
    myMessage: {
      backgroundColor: colors.primary,
      alignSelf: 'flex-end',
      borderBottomRightRadius: 0,
    },
    otherMessage: {
      backgroundColor: colors.card,
      alignSelf: 'flex-start',
      borderBottomLeftRadius: 0,
      borderWidth: 1,
      borderColor: colors.border,
    },
    messageText: { fontSize: 15 },
    inputContainer: {
      flexDirection: 'row',
      padding: 10,
      backgroundColor: colors.card,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    input: {
      flex: 1,
      backgroundColor: colors.background,
      borderRadius: 20,
      paddingHorizontal: 15,
      color: colors.text,
      marginRight: 10,
    },
    sendButton: {
      backgroundColor: colors.primary,
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
