import React, { useState } from "react";
import { Image, View, SafeAreaView, ScrollView, Text, StatusBar, StyleSheet } from 'react-native';
import CardView from "../components/CardView";
import { InputField, Button } from '../components';


export default function AddProblemScreen() {
  
    const [problemTitle, setProblemTitle] = useState('');
    const [problemDescription, setProblemDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

  return (
    <SafeAreaView style={styles.container}>

        <ScrollView showsVerticalScrollIndicator ={false}>

        <Image style={styles.discImage} source={selectedImage!= null ?{ uri: selectedImage.localUri} : {uri: null}}  />

        <View style = {styles.uploadButtonStyle}>
        <Button
            onPress={null}
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
      
    </SafeAreaView>
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
  }
});