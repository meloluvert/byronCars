import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './navigation/MainNavigator';
import "./global.css"


export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <MainNavigator />
    </SafeAreaProvider>
  );
}

