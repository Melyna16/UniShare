import { Stack } from 'expo-router';
import { ThemeProvider } from '../context/ThemeContext';
import { UserProvider } from '../context/UserContext';
import { AnnouncementProvider } from '../context/AnnouncementContext'; // <-- Import

export default function RootLayout() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AnnouncementProvider>
          {' '}
          {/* <-- Ajout du nouveau Provider */}
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </AnnouncementProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
