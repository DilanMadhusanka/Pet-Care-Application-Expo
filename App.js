import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import MainTabScreen from './screens/MainTabScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainTabScreen" component={MainTabScreen} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}