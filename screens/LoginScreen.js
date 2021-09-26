import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton } from 'react-native';

import { Button, InputField, ErrorMessage } from '../components';
import Firebase from '../config/firebase';

const auth = Firebase.auth();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onLogin = async () => {
    try {
      if (email !== '' && password !== '') {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      <View style={styles.header}>
            <Text style={styles.headerTitle}>Sign In</Text>
            <Text style={styles.headerSubTitle}>Welcome Back and Glad to see you !</Text>
          </View>
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20,
          borderRadius: 20 ,
        }}
        leftIcon='email'
        placeholder='Enter email'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        autoFocus={true}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20,
          borderRadius: 20 ,
        }}
        leftIcon='lock'
        placeholder='Enter password'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType='password'
        rightIcon={rightIcon}
        value={password}
        onChangeText={text => setPassword(text)}
        handlePasswordVisibility={handlePasswordVisibility}
      />
      {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
      <View style={styles.submitContainer}>
        <Button
          onPress={onLogin}
          backgroundColor='#FF7070'
          title='Login'
          tileColor='#fff'
          titleSize={20}
          containerStyle={{
            marginBottom: 10
          }}
        />
        <View style={styles.containerLogin}>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>Don't have an account ? </Text>
          <Text style={{color: '#FF7070', fontSize: 17, fontWeight: 'bold'}} onPress={() => navigation.navigate('Signup')}>Sign Up</Text>
        </View>
      </View>
    </View>
  );
}

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
    marginTop: 100,
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
submitContainer: {
  position: 'absolute',
  bottom: 20,
  left: 0,
  right: 0,
  alignItems: 'center',
  marginHorizontal: 10
},
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    alignSelf: 'center',
    paddingBottom: 24
  },
  containerLogin: {
    flexDirection: 'row',
    opacity: 0.7
}
});