import React, { useCallback } from 'react'; // 1. Importar useCallback
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // 2. Importar useFocusEffect

export default function LogoutScreen() {
  const { signOut } = useAuth();
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { 
          text: 'Não', 
          style: 'cancel',
          onPress: () => navigation.navigate('Home') 
        },
        { 
          text: 'Sim', 
          onPress: signOut 
        },
      ]
    );
  };

  // 3. Substituir o useEffect por useFocusEffect
  useFocusEffect(
    useCallback(() => {
      handleLogout();
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center" />
  );
}