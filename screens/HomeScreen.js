import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen() {
   return (
        <View style={styles.container}>
          <Text>Home Screen</Text>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});