import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// import HomeScreen from '../screens/HomeScreen';
import MainTabScreen from '../screens/MainTabScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='MainTabScreen' component={MainTabScreen} options={{ headerShown: false }}  />
    </Stack.Navigator>
  );
}