import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0B0A1A',
      }}
    >
      <Text style={{ color: 'white', fontSize: 24 }}>Écran Profil</Text>
    </View>
  );
}
