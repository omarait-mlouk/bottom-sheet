import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Settings from './src/screens/settings';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <Settings />
    </GestureHandlerRootView>
  );
}
