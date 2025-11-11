import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import EditMoodScreen from './src/screens/EditMoodScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen} options={{ title: 'Mood Tracker'}} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Histórico'}} />
        <Stack.Screen name="EditMood" component={EditMoodScreen} options={{ title: 'Editar Humor'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}