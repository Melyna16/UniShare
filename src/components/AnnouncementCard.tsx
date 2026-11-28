import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  Share,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAnnouncements, Annonce } from '../context/AnnouncementContext';

interface AnnouncementCardProps {
  item: Annonce;
  isDelegateMode: boolean;
}

export default function AnnouncementCard({ item, isDelegateMode }: AnnouncementCardProps) {
  const { colors } = useTheme();
  const { deleteAnnonce, toggleLike, addComment } = useAnnouncements();
  const styles = getStyles(colors);

  const [modalVisible, setModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<{ id: string; author: string } | null>(null);

  const showAIModeration = isDelegateMode && item.isSuspect;
  const isMyPost = item.auteur === 'Melyna Doe';

  const handleDelete = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Voulez-vous vraiment supprimer cette annonce ?')) deleteAnnonce(item.id);
    } else {
      Alert.alert("Supprimer l'annonce", 'Voulez-vous vraiment supprimer cette annonce ?', [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: () => deleteAnnonce(item.id) },
      ]);
    }
  };

  const handleShare = async () => {
    try {
      if (Platform.OS === 'web') {
        await navigator.clipboard.writeText(`Regarde cette annonce sur UniShare : ${item.titre}`);
        alert('Lien copié dans le presse-papier !');
      } else {
        await Share.share({ message: `Regarde cette annonce sur UniShare : ${item.titre}` });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendComment = () => {
    if (newComment.trim() === '') return;
    addComment(item.id, newComment, replyingTo?.id, replyingTo?.author);
    setNewComment('');
    setReplyingTo(null);
  };

  const closeModal = () => {
    setModalVisible(false);
    setReplyingTo(null);
  };

  return (
    <>
      <View style={[styles.card, showAIModeration && styles.cardSuspect]}>
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
                style={[
                  styles.roleText,
                  { color: item.role === 'Étudiant' ? colors.text : '#FFF' },
                ]}
              >
                {item.role}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={styles.cardDate}>{item.date}</Text>
            {isMyPost && (
              <TouchableOpacity onPress={handleDelete} style={{ padding: 4 }}>
                <Ionicons name="trash-outline" size={18} color={colors.danger} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Text style={styles.cardTitle}>{item.titre}</Text>
        {item.contenu ? <Text style={styles.cardContenu}>{item.contenu}</Text> : null}

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
              <TouchableOpacity
                style={[styles.aiButton, { backgroundColor: colors.danger }]}
                onPress={handleDelete}
              >
                <Text style={styles.aiButtonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={[styles.actionBar, { borderTopColor: colors.border }]}>
          <TouchableOpacity style={styles.actionButton} onPress={() => toggleLike(item.id)}>
            <Ionicons
              name={item.isLiked ? 'heart' : 'heart-outline'}
              size={20}
              color={item.isLiked ? colors.danger : colors.textGray}
            />
            <Text
              style={[styles.actionText, { color: item.isLiked ? colors.danger : colors.textGray }]}
            >
              {item.likes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(true)}>
            <Ionicons name="chatbubble-outline" size={18} color={colors.textGray} />
            <Text style={[styles.actionText, { color: colors.textGray }]}>{item.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={20} color={colors.textGray} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Commentaires</Text>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={{ maxHeight: 350, marginBottom: 15 }}
              showsVerticalScrollIndicator={false}
            >
              {(item.commentsList || []).length > 0 ? (
                item.commentsList?.map((comment) => (
                  <View
                    key={comment.id}
                    style={{
                      backgroundColor: comment.parentId ? colors.background : colors.card,
                      padding: 10,
                      borderRadius: 8,
                      marginBottom: 8,
                      marginLeft: comment.parentId ? 25 : 0,
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderLeftWidth: comment.parentId ? 4 : 1,
                      borderLeftColor: comment.parentId ? colors.primary : colors.border,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 2,
                      }}
                    >
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}
                      >
                        <Text style={{ color: colors.primary, fontWeight: 'bold', fontSize: 13 }}>
                          {comment.author}
                        </Text>
                        {comment.replyToAuthor && (
                          <Text style={{ color: colors.textGray, fontSize: 12, marginLeft: 5 }}>
                            ➔ @{comment.replyToAuthor}
                          </Text>
                        )}
                      </View>

                      <TouchableOpacity
                        onPress={() => setReplyingTo({ id: comment.id, author: comment.author })}
                      >
                        <Text style={{ color: colors.primary, fontSize: 11, fontWeight: 'bold' }}>
                          Répondre
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={{ color: colors.text, fontSize: 14, marginTop: 4 }}>
                      {comment.text}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={{ color: colors.textGray, textAlign: 'center', marginTop: 10 }}>
                  Soyez le premier à commenter !
                </Text>
              )}
            </ScrollView>

            {replyingTo && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: colors.primary + '20',
                  padding: 8,
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              >
                <Text style={{ color: colors.primary, fontSize: 13 }}>
                  Réponse à <Text style={{ fontWeight: 'bold' }}>{replyingTo.author}</Text>
                </Text>
                <TouchableOpacity onPress={() => setReplyingTo(null)}>
                  <Ionicons name="close-circle" size={18} color={colors.primary} />
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.commentInputContainer}>
              <TextInput
                style={[
                  styles.commentInput,
                  { backgroundColor: colors.background, color: colors.text },
                ]}
                placeholder={
                  replyingTo ? `Répondre à ${replyingTo.author}...` : 'Écrire un commentaire...'
                }
                placeholderTextColor={colors.textGray}
                value={newComment}
                onChangeText={setNewComment}
              />
              <TouchableOpacity
                style={[styles.sendCommentBtn, { backgroundColor: colors.primary }]}
                onPress={handleSendComment}
              >
                <Ionicons name="send" size={16} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

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
    cardTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
      lineHeight: 22,
    },
    cardContenu: { color: colors.textGray, fontSize: 14, marginBottom: 15, lineHeight: 20 },
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
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
    modalContent: {
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      minHeight: 400,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    modalTitle: { fontSize: 18, fontWeight: 'bold' },
    commentInputContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    commentInput: { flex: 1, padding: 12, borderRadius: 20, fontSize: 15 },
    sendCommentBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
