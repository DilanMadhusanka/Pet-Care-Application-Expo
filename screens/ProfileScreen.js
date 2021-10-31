
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { Fragment } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button, IconButton, InputField } from '../components';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import 'firebase/storage';
import 'firebase/firestore';

import { LogBox } from 'react-native';
import _ from 'lodash';

LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = message => {
if (message.indexOf('Setting a timer') <= -1) {
   _console.warn(message);
   }
};


const storage = Firebase.storage();

const auth = Firebase.auth();

const ProfileScreen = () => {

  const dbRef = Firebase.firestore().collection('users');

  const [selectedImage, setSelectedImage] = useState(null);
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [neutered, setNeutered] = useState('');
  const [userImageUrl, setUserImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isUserExist, setIsUserExist] = useState(false);
   
  const { user } = useContext(AuthenticatedUserContext);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    console.log(
      "This only happens ONCE.  But it happens AFTER the initial render."
    );
    
    dbRef.doc(user.uid).get().then(function(doc) {
      setIsUserExist(doc.exists)
      if (doc.exists) {
        const { breed, age, weight, gender } = doc.data()
        setBreed(breed)
        setAge(age)
        setWeight(weight),
        setGender(gender)
      }
    })

  }, []);


  const storeUserProfile = () => {

    const updateDBRef = Firebase.firestore().collection('users').doc(user.uid);
    
      setIsLoading(true)    
      updateDBRef.set({
        breed,
        age,
        weight,
        gender
      }).then((res) => {
        setIsLoading(false)
        setIsUpdated(false)
      })
      .catch((err) => {
        console.error("Error found: ", err);
        setIsLoading(false)
        setIsUpdated(false)
      });
  }


  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 450,
      }}
    >
      {/* <Text>Swipe down to close</Text> */}

      <Button title="Camera" onPress={onChooseImageCameraPress} />
      <Button title="Gallery" onPress={onChooseImageGalleryPress} />
    </View>
  );
  
  const onChooseImageCameraPress = async () => {
    let result = await ImagePicker.launchCameraAsync();

    if(!result.cancelled) {
      uploadImage(result.uri).then(() => {
        sheetRef.current.snapTo(2);
      }).catch(error => {
        console.log(error);
      });
    }
  }

  const onChooseImageGalleryPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

    if(!result.cancelled) {
      uploadImage(result.uri).then(() => {
        sheetRef.current.snapTo(2);
      }).catch(error => {
        console.log(error);
      });
    }
  }

  const uploadImage = async (uri) => {
    setSelectedImage({ localUri: uri });

    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = Firebase.storage().ref().child("my-image155");
    // ref.getDownloadURL().then((url) => console.log(url))
    return ref.put(blob).then(function(snapshot){
      // $('#rainbowPhotoURL').val(snapshot.downloadURL);
      // console.log(snapshot.downloadURL);
      ref.getDownloadURL().then((url) => console.log(url))
    })

  }

  const sheetRef = React.useRef(null);

  return (
    <Fragment>
      <SafeAreaView style={styles.topContainer}>
        <View>
          <Feather 
            name="log-out"
            size={28}
            color="white"
            style={styles.logoutIcon}
            onPress={handleSignOut} 
          />
          

          <Pressable onPress={() => sheetRef.current.snapTo(0)}>
            <Image style={styles.userImage} source={selectedImage!= null ?{ uri: selectedImage.localUri} : {uri: Image.resolveAssetSource(require('../assets/user-pet.jpg')).uri}}  />
          </Pressable>

        </View>
      </SafeAreaView>

      <SafeAreaView style={styles.bottomContainer}>
        <ScrollView showsVerticalScrollIndicator ={false}>

          <StatusBar style='dark-content' />

          <View style={styles.row}>
            {/* <Text style={styles.title}>Welcome {user.email}!</Text> */}
          </View>
          {/* <Text style={styles.text}>Your UID is: {user.uid} </Text>

          <InputField
            inputStyle={{
              fontSize: 14
            }}
            containerStyle={{
              backgroundColor: '#eee',
              marginBottom: 0,
              borderRadius: 20 ,
            }}
            leftIcon='email'
            placeholder='Enter email'
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
            autoFocus={false}
            value={user.email}
            onChangeText={text => console.log(text)}
          /> */}

          {/* <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          /> */}

          <View style={styles.userDetailsContainer}>

            <Text>Breed</Text>

            <InputField
              inputStyle={{
                fontSize: 14
              }}
              containerStyle={{
                backgroundColor: '#eee',
                marginBottom: 0,
                borderRadius: 20,
                marginLeft: 150,
              }}
              placeholder='Enter Breed'
              autoCapitalize='none'
              keyboardType='default'
              textContentType='none'
              autoFocus={false}
              value={breed}
              onChangeText={text => {
                setIsUpdated(true)
                setBreed(text)
              }}
            />

          </View>

          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />

          <View style={styles.userDetailsContainer}>

            <Text>Age</Text>

            <InputField
              inputStyle={{
                fontSize: 14
              }}
              containerStyle={{
                backgroundColor: '#eee',
                marginBottom: 0,
                borderRadius: 20,
                marginLeft: 161,
              }}
              placeholder='Enter Age'
              autoCapitalize='none'
              keyboardType='default'
              textContentType='none'
              autoFocus={false}
              value={age}
              onChangeText={text => {
                setIsUpdated(true)
                setAge(text)
              }}
            />

          </View>

          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginBottom:1
            }}
          />

          <View style={styles.userDetailsContainer}>

            <Text>Weight</Text>

            <InputField
              inputStyle={{
                fontSize: 14
              }}
              containerStyle={{
                backgroundColor: '#eee',
                marginBottom: 0,
                borderRadius: 20,
                marginLeft: 142,
              }}
              placeholder='Enter Weight'
              autoCapitalize='none'
              keyboardType='default'
              textContentType='none'
              autoFocus={false}
              value={weight}
              onChangeText={text => {
                setIsUpdated(true)
                setWeight(text)
              }}
            />

          </View>

          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />

          <View style={styles.userDetailsContainer}>

            <Text>Gender</Text>

            <InputField
              inputStyle={{
                fontSize: 14
              }}
              containerStyle={{
                backgroundColor: '#eee',
                marginBottom: 0,
                borderRadius: 20,
                marginLeft: 140,
              }}
              placeholder='Enter Gender'
              autoCapitalize='none'
              keyboardType='default'
              textContentType='none'
              autoFocus={false}
              value={gender}
              onChangeText={text => {
                setIsUpdated(true)
                setGender(text)
              }}
            />

          </View>

          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />

          {
          isUpdated ? 
            <Button
              onPress={storeUserProfile}
              backgroundColor='#FF7070'
              title='Save'
              tileColor='#fff'
              titleSize={20}
              containerStyle={{
                marginBottom: 10,
                marginTop: 20
              }}
            /> : 
            null
          }
          
        </ScrollView>
      </SafeAreaView>
      
      <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        initialSnap={2}
        borderRadius={10}
        renderContent={renderContent}
        enabledContentGestureInteraction={false}
      />
    </Fragment>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({

  topContainer: {
    flex: 1,
    backgroundColor: '#FF7070'
  },

  logoutIcon: {
    marginTop: 70,
    alignSelf: 'flex-end',
    marginRight: 20
  },

  userImage: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'white',
    marginTop: 25,
  },
    
  bottomContainer: {
      flex: 1,
      backgroundColor: '#eee',
      paddingTop: 50,
      paddingHorizontal: 12
  },

  row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24
  },
  title: {
      fontSize: 24,
      fontWeight: '600',
      color: '#000'
  },
  text: {
      fontSize: 16,
      fontWeight: 'normal',
      color: '#000'
  },

  userDetailsContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0
  }
});
  