import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* On indique que l'application démarre sur le groupe d'onglets */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
