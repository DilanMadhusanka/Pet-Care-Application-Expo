import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ExploreScreen from '../screens/ExploreScreen';
import AddProblemScreen from '../screens/AddProblemScreen';
import SolutionScreen from '../screens/SolutionScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='ExploreHome' component={ExploreScreen} options={{ 
        title: 'Find Solution for Dieseases', 
        headerTintColor: 'white',
        headerLeft: null, 
        headerStyle: {
            backgroundColor: '#FF7070'
            }, 
       }} />
      <Stack.Screen 
        name='AddProblemView' 
        component={AddProblemScreen} 
        options={{
             title: 'Add a Problem', 
             headerTintColor: 'white',
             headerLeft: null, 
             headerStyle: {
                 backgroundColor: '#FF7070'
                 }, 
        }} />
        <Stack.Screen 
            name='Solution' 
            component={SolutionScreen} 
            options={{
                title: 'Solution', 
                headerTintColor: 'white',
                headerLeft: null, 
                headerStyle: {
                    backgroundColor: '#FF7070'
                    }, 
            }} />
    </Stack.Navigator>
  );
}