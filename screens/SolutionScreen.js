import { Entypo } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, StatusBar, TouchableOpacity, Image, Modal, Dimensions } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import { InputField, Button } from '../components';
import ExploreCardView from '../components/ExploreCardView';
import Firebase from '../config/firebase';
import 'firebase/firestore';
import SolutionCardView from "../components/SolutionCardView";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";

const { width } = Dimensions.get("window");

const renderItem = ({ item }) => <SolutionCardView title={item.title} desc={item.description} image={item.imageUrl} />

  const clickHandler = () => {
    //function to handle click on floating Action Button
    alert('Floating Button Clicked');
  };

  const SolutionScreen = ({route, navigation}) => {

  const dbRef = Firebase.firestore().collection('solutions');
  const { user } = useContext(AuthenticatedUserContext);

  const [isModalVisible, setModalVisible] = useState(false);
  const [solutionDetailsArr, setSolutionDetailsArr] = useState([]);
  const [solution, setSolution] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Create toggleModalVisibility function that will
  // Open and close modal upon button clicks.
  const toggleModalVisibility = () => {
      setModalVisible(!isModalVisible);
  };
  const { problemKey, title, desc, image } = route.params;

  useEffect(() => {
    // console.log(route.params)
    const unsubscribe = dbRef.onSnapshot(getCollection);
    unsubscribe
  }, []);


  const getCollection = (querySnapshot) => {
    const solutionArr = []
    querySnapshot.forEach((res) => {
      const { problemId, title, description } = res.data();
      if (problemId == problemKey) {
        solutionArr.push({
          key: res.id,
          res,
          title,
          description,
        });
      }
    });
    setSolutionDetailsArr(solutionArr)
    setIsLoading(false)
  }


  const storeSolution = () => {
    if(solution === ''){
        alert('Please enter your solution!')
        toggleModalVisibility()

    } else {
      setIsLoading(true)    
      dbRef.add({
        problemId: problemKey,
        title: user.email.split('@')[0],
        description: solution,
      }).then((res) => {
        toggleModalVisibility()
        setSolution('')
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("Error found: ", err);
        setIsLoading(false)
      });
    }
  }


    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.problemContainer}>
            <Text style={styles.problemTitleStyle}>{title}</Text>
            <Text>{desc}</Text>
            <Image style={styles.discImage} source={{ uri: image}}  />
        </View>

        <Text style={styles.solutionTopicTextStyle}>Reasons {'&'} Solutions</Text>

        <FlatList data={solutionDetailsArr} renderItem={renderItem} keyExtractor={item => item.key} style={styles.flatListContainer} />


        <Modal animationType="slide" 
                   transparent visible={isModalVisible} 
                   presentationStyle="overFullScreen" 
                   onDismiss={toggleModalVisibility}>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        {/* <TextInput placeholder="Enter something..." 
                                   value={inputValue} style={styles.textInput} 
                                   onChangeText={(value) => setInputValue(value)} /> */}

                        <Text style={styles.modalTopicStyle}>Give a Solution</Text>


                        <InputField
                          inputStyle={{
                          fontSize: 14,
                          height: 70,
                          justifyContent: "flex-start",
                          textAlignVertical: 'top',
                          }}
                          containerStyle={{
                          backgroundColor: '#fff',
                          marginBottom: 10,
                          marginTop: 10,
                          borderRadius: 10 ,
                          borderColor: 'gray',
                          borderWidth: 2,
                          marginHorizontal: 10
                          }}
                          placeholder=''
                          autoCapitalize='none'
                          autoCorrect={false}
                          textContentType='none'
                          value={solution}
                          onChangeText={text => setSolution(text)}
                          multiline={true}
                      />

                      <Button
                        onPress={storeSolution}
                        backgroundColor='#FF7070'
                        title='Submit'
                        tileColor='#fff'
                        titleSize={15}
                        containerStyle={{
                        borderRadius: 10,
                        width: 100,
                        height: 40,
                        alignSelf: 'center',
                        marginBottom: 10,
                        marginRight: 0
                        }}
                      />
                    </View>
                </View>
        </Modal>


        <TouchableOpacity
          activeOpacity={0.7}
          onPress={toggleModalVisibility}
          style={styles.touchableOpacityStyle}>
            <Entypo name="plus" size={28} color="white" />
        </TouchableOpacity>

      </SafeAreaView>
    );
};

export default SolutionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginHorizontal: 10
  },

  flatListContainer: {},

  touchableOpacityStyle: {
    position: 'absolute',
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#FF7070',
    borderRadius: 100
  },
  discImage: {
    width: '100%',
    height: 100,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gainsboro',
    backgroundColor: 'gainsboro',
    marginTop: 25,
  },

  problemContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    elevation: 2
  },
  problemTitleStyle: {
      fontWeight: 'bold',
      marginBottom: 5
  },

  problemDescStyle: {},

  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
},
modalView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) }, 
                { translateY: -100 }],
    height: 220,
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 7,
},
modalTopicStyle: {
  alignSelf:'flex-start',
  marginLeft: 10,
  marginTop: 10,
  marginBottom: 10,
  fontWeight: 'bold',
  fontSize: 15
},
textInput: {
    width: "80%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    marginBottom: 8,
},

solutionTopicTextStyle: {
  marginTop: 30,
  marginBottom: 20,
  fontWeight: 'bold'
},
});
  