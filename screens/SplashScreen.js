import React from "react";
import { View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

import splashImage from '../assets/pet_care_splash_screen.png';

const title = 'Get Start';

const SplashScreen = ({navigation}) => {
    return (
        <View style={styles.container}>

          <View style={styles.header}>
            <View>
                <Image 
                    source={splashImage}
                    style={{width: 300 , height: 300 }}
                />
            </View>

            <View>
                <Text style={styles.headerTitleText}>Pet Care</Text>
                <Text style={styles.headerBodyText}>Helping you to take good care of your pet</Text>
            </View>
          </View>

          <TouchableOpacity onPress={()=> navigation.navigate("Login")} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>{title}</Text>
          </TouchableOpacity>

          
        </View>
      );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FF7070',
      padding: 10
    },
    header: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitleText: {
        color: '#fff',
        fontSize: 35,
        alignSelf: 'center',
        marginTop: 50,
    },
    headerBodyText: {
        fontSize: 17,
        color: '#fff',
        alignSelf: 'center',
        marginTop: 5
    },
    appButtonContainer: {
        elevation: 5,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 20,
        marginHorizontal: 50
      },
      appButtonText: {
        fontSize: 18,
        color: "#000",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        opacity: 0.7,
      }
});
  