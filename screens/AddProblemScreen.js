import React, { useState } from "react";
import { Image, View, SafeAreaView, ScrollView, Text, StatusBar, StyleSheet } from 'react-native';
import CardView from "../components/CardView";
import { InputField, Button } from '../components';
import BottomSheet from 'reanimated-bottom-sheet';
import { Fragment } from "react";
import * as ImagePicker from 'expo-image-picker';
import Firebase from '../config/firebase';
import 'firebase/storage';
import { AntDesign } from '@expo/vector-icons';
import uuid from 'react-native-uuid';


export default function AddProblemScreen() {
  
    const [problemTitle, setProblemTitle] = useState('');
    const [problemDescription, setProblemDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const sheetRef = React.useRef(null);

    const renderContent = () => (
        <View
          style={styles.bottomSheetContainer}
        >
            <View>
                <AntDesign style={{alignSelf: 'flex-end', marginTop: -20}} name="close" size={24} color="black" onPress={() => sheetRef.current.snapTo(2)} />
            </View>

            <Text style={styles.bottomSheetText}>Choose the Image Source</Text>
    
            <View style={styles.bottomSheetButtonCamera}>
                <Button title="Camera" backgroundColor='#FF7070' onPress={onChooseImageCameraPress} />
            </View>
            <View style={styles.bottomSheetButtonGallery}>
                <Button title="Gallery" backgroundColor='#FF7070' onPress={onChooseImageGalleryPress} />
            </View>
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
        var ref = Firebase.storage().ref().child(uuid.v4());
        // ref.getDownloadURL().then((url) => console.log(url))
        return ref.put(blob).then(function(snapshot){
          // $('#rainbowPhotoURL').val(snapshot.downloadURL);
          // console.log(snapshot.downloadURL);
          ref.getDownloadURL().then((url) => console.log(url))
        })
    
    }


  return (
    <Fragment>
        <SafeAreaView style={styles.container}>

            <ScrollView showsVerticalScrollIndicator ={false}>

                <Image style={styles.discImage} source={selectedImage!= null ?{ uri: selectedImage.localUri} : {uri: null}}  />

                <View style = {styles.uploadButtonStyle}>
                    <Button
                        onPress={() => sheetRef.current.snapTo(0)}
                        backgroundColor='#FF7070'
                        title='Upload'
                        tileColor='#fff'
                        titleSize={20}
                        containerStyle={{
                        marginBottom: 10,
                        borderRadius: 100
                        }}
                    />
                </View>
        
                <View style={styles.problemTitleStyle}>

                    <Text style={styles.problemTitleTextStyle}>Problem Title</Text>

                    <InputField
                        inputStyle={{
                        fontSize: 14,
                        }}
                        containerStyle={{
                        backgroundColor: '#fff',
                        marginBottom: 20,
                        borderRadius: 10 ,
                        marginTop: 0
                        }}
                        placeholder=''
                        autoCapitalize='none'
                        keyboardType='default'
                        textContentType='none'
                        autoFocus={true}
                        value={problemTitle}
                        onChangeText={text => setProblemTitle(text)}
                    />
            </View>
            <View style={styles.problemDiscStyle}>

                    <Text style={styles.problemDiscTextStyle}>Problem Description</Text>

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
                        textContentType='none'
                        value={problemDescription}
                        onChangeText={text => setProblemDescription(text)}
                        multiline={true}
                    />
            </View>

            <View >
                <Button
                    onPress={null}
                    backgroundColor='#FF7070'
                    title='Submit'
                    tileColor='#fff'
                    titleSize={20}
                    containerStyle={{
                    marginBottom: 10,
                    }}
                />
            </View>

            </ScrollView>

            <BottomSheet
                ref={sheetRef}
                snapPoints={[250, 100, 0]}
                initialSnap={2}
                borderRadius={10}
                renderContent={renderContent}
                enabledContentGestureInteraction={false}
            />

        </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal:10
  },

  problemTitleStyle: {
      marginTop: 10,
  },

  problemTitleTextStyle: {
      marginBottom: 10,
      color: 'black',
      fontWeight: 'bold'
  },

  problemDiscStyle: {},

  problemDiscTextStyle: {
      marginBottom: 10,
      color: 'black',
      fontWeight: 'bold'
  },

  discImage: {
    width: '100%',
    height: 200,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gainsboro',
    backgroundColor: 'gainsboro',
    marginTop: 25,
  },

  uploadButtonStyle: {
      marginHorizontal: 50,
      marginTop: 20,
      width:120,
      alignSelf: 'center'
  },
  bottomSheetContainer: {
    backgroundColor: 'white',
    padding: 16,
    height: 450,
  },
  bottomSheetButtonCamera: {
      marginTop: 20
  },
  bottomSheetButtonGallery: {
      marginTop: 10
  },
  bottomSheetText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 15
  }
});