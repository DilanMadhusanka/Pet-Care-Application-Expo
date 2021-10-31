import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, StatusBar, TouchableOpacity, Image, Modal, Dimensions } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import { InputField, Button } from '../components';
import ExploreCardView from '../components/ExploreCardView';
import Firebase from '../config/firebase';
import 'firebase/firestore';
import SolutionCardView from "../components/SolutionCardView";

const { width } = Dimensions.get("window");

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: 'https://picsum.photos/id/237/200/300'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: 'https://picsum.photos/id/238/200/300'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: 'https://picsum.photos/id/239/200/300'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d71',
    title: 'Fourth Item',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: 'https://picsum.photos/id/240/200/300'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d77',
    title: 'Fifth Item',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: 'https://picsum.photos/id/241/200/300'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Sixth Item',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: 'https://picsum.photos/id/242/200/300'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d43',
    title: 'Seventh Item',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: 'https://picsum.photos/id/243/200/300'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d25',
    title: 'Eightth Item',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: 'https://picsum.photos/id/244/200/300'
  },
];

const renderItem = ({ item }) => <SolutionCardView title={item.title} desc={item.description} image={item.imageUrl} />

  const clickHandler = () => {
    //function to handle click on floating Action Button
    alert('Floating Button Clicked');
  };

  const SolutionScreen = ({route, navigation}) => {

  const dbRef = Firebase.firestore().collection('solutions');

  const [isModalVisible, setModalVisible] = useState(false);
  const [solutionDetailsArr, setSolutionDetailsArr] = useState([]);
  
  // This is to manage TextInput State
  const [inputValue, setInputValue] = useState("");
  
  // Create toggleModalVisibility function that will
  // Open and close modal upon button clicks.
  const toggleModalVisibility = () => {
      setModalVisible(!isModalVisible);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const { title, desc, image } = route.params;

//   const [problemDetailsArr, setProblemDetailsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // console.log(route.params)
    const unsubscribe = dbRef.onSnapshot(getCollection);
  }, []);


  const getCollection = (querySnapshot) => {
    const solutionArr = []
    querySnapshot.forEach((res) => {
      const { title, description } = res.data();
      solutionArr.push({
        key: res.id,
        res,
        title,
        description,
      });
    });
    setSolutionDetailsArr(solutionArr)
    setIsLoading(false)
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
                          value={null}
                          onChangeText={text => console.log(text)}
                          multiline={true}
                      />

                      <Button
                        onPress={toggleModalVisibility}
                        backgroundColor='#FF7070'
                        title='Close'
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
  