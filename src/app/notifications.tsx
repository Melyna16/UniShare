
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  icon: keyof typeof Ionicons.glyphMap;
  read: boolean;
};

const initialNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Nouvelle annonce',
    message: 'Une nouvelle annonce a été publiée dans votre fil.',
    time: 'Il y a 10 min',
    icon: 'megaphone-outline',
    read: false,
  },
  {
    id: '2',
    title: 'Nouvelle ressource',
    message: 'Une nouvelle ressource pédagogique est disponible.',
    time: 'Il y a 1 heure',
    icon: 'book-outline',
    read: false,
  },
  {
    id: '3',
    title: 'Bienvenue sur UniShare !',
    message: 'Merci de rejoindre notre communauté étudiante.',
    time: 'Hier',
    icon: 'school-outline',
    read: true,
  },
];

export default function NotificationsScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(item => ({ ...item, read: true }))
    );
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(item =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev =>
      prev.filter(item => item.id !== id)
    );
  };

  const clearAll = () => {
    Alert.alert(
      'Supprimer toutes les notifications',
      'Voulez-vous vraiment supprimer toutes les notifications ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => setNotifications([]),
        },
      ]
    );
  };

  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notifications</Text>

        <TouchableOpacity onPress={clearAll}>
          <Ionicons name="trash-outline" size={22} color={colors.textGray} />
        </TouchableOpacity>
      </View>

      <View style={styles.subtitleRow}>
        <Text style={styles.subtitle}>
          {unreadCount} non lue(s)
        </Text>

        <TouchableOpacity
          onPress={markAllAsRead}
          disabled={unreadCount === 0}
        >
          <Text style={[
            styles.markAll,
            unreadCount === 0 && { opacity: 0.4 }
          ]}>
            Tout marquer comme lu
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons
              name="notifications-off-outline"
              size={55}
              color={colors.textGray}
            />
            <Text style={styles.emptyTitle}>
              Aucune notification
            </Text>
            <Text style={styles.emptyText}>
              Vous êtes à jour !
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => markAsRead(item.id)}
            style={[
              styles.notificationCard,
              !item.read && styles.unreadCard,
            ]}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name={item.icon}
                size={23}
                color={colors.primary}
              />
            </View>

            <View style={styles.content}>
              <View style={styles.titleRow}>
                <Text style={styles.notificationTitle}>
                  {item.title}
                </Text>

                {!item.read && (
                  <View style={styles.unreadDot} />
                )}
              </View>

              <Text style={styles.message}>
                {item.message}
              </Text>

              <Text style={styles.time}>
                {item.time}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => deleteNotification(item.id)}
              style={styles.deleteButton}
            >
              <Ionicons
                name="close"
                size={19}
                color={colors.textGray}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
      paddingTop: 30,
    },
    headerTitle: {
      fontSize: 21,
      fontWeight: 'bold',
      color: colors.text,
    },
    subtitleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 12,
    },
    subtitle: {
      fontSize: 13,
      color: colors.textGray,
    },
    markAll: {
      fontSize: 12,
      color: colors.primary,
      fontWeight: 'bold',
    },
    list: {
      padding: 16,
      paddingBottom: 30,
      flexGrow: 1,
    },
    notificationCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: colors.card,
      borderRadius: 14,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    unreadCard: {
      borderColor: colors.primary,
      backgroundColor: colors.card,
    },
    iconContainer: {
      width: 45,
      height: 45,
      borderRadius: 13,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    content: {
      flex: 1,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
    },
    notificationTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.text,
    },
    unreadDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: colors.danger,
    },
    message: {
      fontSize: 12,
      color: colors.textGray,
      marginTop: 5,
      lineHeight: 18,
    },
    time: {
      fontSize: 11,
      color: colors.textGray,
      marginTop: 7,
    },
    deleteButton: {
      padding: 7,
      marginLeft: 5,
    },
    empty: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30,
    },
    emptyTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: colors.text,
      marginTop: 15,
    },
    emptyText: {
      color: colors.textGray,
      marginTop: 7,
      fontSize: 13,
    },
  });
