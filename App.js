import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from '@react-navigation/native';
import answersreducer from "./features/answer"
import Homme from './screens/Homme';
import { configureStore } from '@reduxjs/toolkit'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch } from 'react-redux'
export default function App() {
  const Stack = createNativeStackNavigator();
  const store = configureStore({
    reducer: {
      answers: answersreducer,

    },

  })

  return (
    <NavigationContainer>
      <Provider store={store}>
        <TailwindProvider>

          <Stack.Navigator>

            <Stack.Screen name="Home" component={Homme} />

          </Stack.Navigator>

        </TailwindProvider>
      </Provider>
    </NavigationContainer >
  );
}


