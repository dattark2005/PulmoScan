import { StyleSheet, View } from 'react-native';
import Home from './src/Add.js'
import RootLayout from './app/layout.jsx';
import { useRouter } from 'expo-router';
import Index from './app/index.jsx';

export default function App() {
  return (
    <View style={styles.container}>
      <Index/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
