import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView, FlatList, StatusBar, TouchableOpacity, Image } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import ExploreCardView from '../components/ExploreCardView';
import Firebase from '../config/firebase';
import 'firebase/firestore';

const clickHandler = () => {
  //function to handle click on floating Action Button
  alert('Floating Button Clicked');
};

const ExploreScreen = ({navigation}) => {

  const renderItem = ({ item }) => <ExploreCardView problemKey={item.key} title={item.title} desc={item.description} image={item.imageUrl} navigation={navigation} />;

  const dbRef = Firebase.firestore().collection('problems');
  const [problemDetailsArr, setProblemDetailsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(
      "This only happens ONCE.  But it happens AFTER the initial render."
    );
    const unsubscribe = dbRef.onSnapshot(getCollection);
  }, []);


  const getCollection = (querySnapshot) => {
    const problemsArr = []
    querySnapshot.forEach((res) => {
      const { title, description, imageUrl } = res.data();
      problemsArr.push({
        key: res.id,
        res,
        title,
        description,
        imageUrl,
      });
    });
    setProblemDetailsArr(problemsArr)
    setIsLoading(false)
  }

    return (
      <SafeAreaView style={styles.container}>
        <FlatList data={problemDetailsArr} renderItem={renderItem} keyExtractor={item => item.key} style={styles.flatListContainer} />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={()=> navigation.navigate("AddProblemView")}
          style={styles.touchableOpacityStyle}>
            <Entypo name="plus" size={28} color="white" />
        </TouchableOpacity>

      </SafeAreaView>
    );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
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
  }
});
  