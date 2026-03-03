import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthNavigator from './navigation/AuthNavigator';
import "./global.css"


export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <AuthNavigator />
    </SafeAreaProvider>
  );
}

