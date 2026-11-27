import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useMessages } from '../../context/MessageContext';
import { ChatMessage } from '../../data/mockData';

export default function ChatScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { id } = useLocalSearchParams();
  const { getConversation, sendMessage } = useMessages();
  const [input, setInput] = useState('');

  const conversation = getConversation(id as string);

  if (!conversation) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: colors.text, padding: 20 }}>Conversation introuvable.</Text>
      </SafeAreaView>
    );
  }

  const handleSend = () => {
    if (input.trim() === '') return;
    sendMessage(conversation.id, input);
    setInput('');
  };

  const handleAttach = () => {
    // Mock file attachment for resource submissions
    if (conversation.type !== 'resource') {
      Alert.alert('Info', 'Les pièces jointes ne sont disponibles que pour les soumissions de ressources.');
      return;
    }
    Alert.alert('Fichier joint', 'Simulé : Cours_Reseaux.pdf (2.4 MB)', [
      {
        text: 'Envoyer',
        onPress: () =>
          sendMessage(conversation.id, '📎 Fichier joint', { name: 'Cours_Reseaux.pdf', size: '2.4 MB' }),
      },
      { text: 'Annuler', style: 'cancel' },
    ]);
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => (
    <View style={[styles.messageBubble, item.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
      {item.attachment && (
        <View style={[styles.attachment, { borderColor: item.sender === 'me' ? '#FFF' : colors.border }]}>
          <Ionicons name="document-text" size={16} color={item.sender === 'me' ? '#FFF' : colors.primary} />
          <Text style={[styles.attachmentText, { color: item.sender === 'me' ? '#FFF' : colors.text }]}>
            {item.attachment.name} • {item.attachment.size}
          </Text>
        </View>
      )}
      {item.text ? (
        <Text style={[styles.messageText, item.sender === 'me' ? { color: '#FFF' } : { color: colors.text }]}>
          {item.text}
        </Text>
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 10 }}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text style={styles.headerTitle} numberOfLines={1}>{conversation.participantName}</Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>{conversation.title}</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      <FlatList
        data={conversation.messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ padding: 16 }}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputContainer}>
          {conversation.type === 'resource' && (
            <TouchableOpacity style={styles.attachBtn} onPress={handleAttach}>
              <Ionicons name="attach" size={22} color={colors.primary} />
            </TouchableOpacity>
          )}
          <TextInput
            style={styles.input}
            placeholder="Écrire un message..."
            placeholderTextColor={colors.textGray}
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  headerSubtitle: { fontSize: 12, color: colors.primary, fontWeight: '600' },
  messageBubble: { padding: 12, borderRadius: 16, marginBottom: 10, maxWidth: '80%' },
  myMessage: { backgroundColor: colors.primary, alignSelf: 'flex-end', borderBottomRightRadius: 0 },
  otherMessage: { backgroundColor: colors.card, alignSelf: 'flex-start', borderBottomLeftRadius: 0, borderWidth: 1, borderColor: colors.border },
  messageText: { fontSize: 15 },
  attachment: { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 8, borderWidth: 1, borderRadius: 8, marginBottom: 6 },
  attachmentText: { fontSize: 12, fontWeight: '600' },
  inputContainer: { flexDirection: 'row', padding: 10, backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: colors.border, alignItems: 'center' },
  attachBtn: { padding: 8, marginRight: 4 },
  input: { flex: 1, backgroundColor: colors.background, borderRadius: 20, paddingHorizontal: 15, color: colors.text, marginRight: 10, height: 40 },
  sendButton: { backgroundColor: colors.primary, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
});