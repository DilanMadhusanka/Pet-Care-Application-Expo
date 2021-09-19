import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';

const SplashScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
          <Text>Splash Screen</Text>
          <Button
            title="Get Start"
            onPress={()=> navigation.navigate("Login")}
          />
        </View>
      );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  