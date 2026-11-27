// src/app/_layout.tsx
import { useEffect } from 'react';
import { Stack, useRouter, usePathname } from 'expo-router';
import { ThemeProvider } from '../context/ThemeContext';
import { UserProvider, useUser } from '../context/UserContext';
import { AnnouncementProvider } from '../context/AnnouncementContext';
import { MessageProvider } from '../context/MessageContext';

function RootLayoutNav() {
  const { isAuthenticated } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check if the current URL is the login or register page
    const inAuthGroup = pathname.includes('login') || pathname.includes('register');

    if (!isAuthenticated && !inAuthGroup) {
      // If not logged in and trying to access home, go to login
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      // If logged in and on login page, go to home
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, pathname]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AnnouncementProvider>
          <MessageProvider>
            <RootLayoutNav />
          </MessageProvider>
        </AnnouncementProvider>
      </UserProvider>
    </ThemeProvider>
  );
}