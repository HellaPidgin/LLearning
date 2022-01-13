
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UI from "./app/ui";
import { AppProvider } from './app/provider';
import QuizComplete from './app/ui/quizComplete';


const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Home"
            component={UI}
          />
          <Stack.Screen
            name="Complete"
            component={QuizComplete}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}