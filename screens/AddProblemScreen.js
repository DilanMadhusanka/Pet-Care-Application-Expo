import React, { useState } from "react";
import { View, SafeAreaView, FlatList, Text, StatusBar, StyleSheet } from 'react-native';
import CardView from "../components/CardView";
import { Button, InputField, ErrorMessage } from '../components';


export default function AddProblemScreen() {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [loginError, setLoginError] = useState('');

  return (
    <View style={styles.container}>
        
      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20,
          borderRadius: 10 ,
          marginTop: 50
        }}
        placeholder=''
        autoCapitalize='none'
        keyboardType='default'
        textContentType='none'
        autoFocus={true}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <InputField
        inputStyle={{
          fontSize: 14,
          height: 100,
          justifyContent: "flex-start",
          textAlignVertical: 'top'
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20,
          borderRadius: 10 ,
        }}
        placeholder=''
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType='password'
        value={password}
        onChangeText={text => setPassword(text)}
        multiline={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginHorizontal:10
  },

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});