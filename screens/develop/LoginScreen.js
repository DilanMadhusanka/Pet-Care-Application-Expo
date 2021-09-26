import React from "react";
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const LoginScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Sign In</Text>
            <Text style={styles.headerSubTitle}>Welcome Back and Glad to see you !</Text>
          </View>
          <View style={styles.TextInputContainer}>
              <TextInput
                placeholder="Enter your name"
                underlineColorAndroid='transparent'
                style={styles.TextInputStyle}
              />
          </View>
          <View style={styles.TextInputContainer}>
              <TextInput
                placeholder="Enter your password"
                underlineColorAndroid='transparent'
                style={styles.TextInputStyle}
              />
          </View>
          

          <View style={styles.submitContainer}>
            <TouchableOpacity onPress={()=> {navigation.navigate("MainTabScreen")}} style={styles.appButtonContainer}>
                    <Text style={styles.appButtonText}>Sign In</Text>
            </TouchableOpacity>
            <View style={styles.containerLogin}>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>Don't have an account ? </Text>
                <Text style={{color: '#FF7070', fontSize: 17, fontWeight: 'bold'}}>Sign Up</Text>
            </View>
          </View>

        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',  
        padding: 10
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        opacity: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    headerSubTitle: {
        fontSize: 20,
        opacity: 0.8,
        marginHorizontal: 20,
        textAlign: 'center',
        marginBottom: 20
    },


    TextInputContainer :{
        justifyContent: 'center',
        width: '88%',
        margin: 10
         
    },
         
    TextInputStyle:{
        height: 50,
        paddingStart: 10,
        borderWidth: 2,
        borderColor: '#FF5722',
        borderRadius: 10 ,
        backgroundColor : "#FFFFFF",
        width: '100%'
         
    },

    submitContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
        marginHorizontal: 10
    },

    appButtonContainer: {
        elevation: 5,
        width: '88%',
        backgroundColor: "#FF7070",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 10,
        marginHorizontal: 50,
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "normal",
        alignSelf: "center",
        textTransform: "capitalize",
        opacity: 0.8,
      },
      containerLogin: {
          flexDirection: 'row',
          opacity: 0.7
      }

  });