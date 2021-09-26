import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton } from 'react-native';

import { Button, InputField, ErrorMessage } from '../components';
import Firebase from '../config/firebase';

const auth = Firebase.auth();

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [signupError, setSignupError] = useState('');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onHandleSignup = async () => {
    try {
      if (email !== '' && password !== '') {
        await auth.createUserWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sign Up</Text>
        <Text style={styles.headerSubTitle}>Create an new account to access all feature</Text>
      </View>
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20,
          borderRadius: 20,
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
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20,
          borderRadius: 20,
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
      {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
      <View style={styles.submitContainer}>
        <Button
          onPress={onHandleSignup}
          backgroundColor='#FF7070'
          title='Signup'
          tileColor='#fff'
          titleSize={20}
          containerStyle={{
            marginBottom: 10,
          }}
        />
        <View style={styles.containerLogin} >
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>Alread have an account ? </Text>
          <Text style={{color: '#FF7070', fontSize: 17, fontWeight: 'bold'}} onPress={() => {navigation.navigate("Login")}}>Sign In</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    paddingTop: 50,
    paddingHorizontal: 12
  },

  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50
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
containerLogin: {
  flexDirection: 'row',
  opacity: 0.7,
  justifyContent: 'center'
}

});