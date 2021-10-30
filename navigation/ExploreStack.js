import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ExploreScreen from '../screens/ExploreScreen';
import AddProblemScreen from '../screens/AddProblemScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='ExploreHome' component={ExploreScreen} options={{ headerShown: false }} />
      <Stack.Screen name='AddProblemView' component={AddProblemScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}