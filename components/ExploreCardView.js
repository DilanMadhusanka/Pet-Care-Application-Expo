import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

const clickHandler = () => {
  //function to handle click on floating Action Button
  alert('Floating Button Clicked');
};

const ExploreCardView = ({title, desc, image, navigation}) => {


  const clickHandler = () => {
    //function to handle click on floating Action Button
    // alert('Floating Button Clicked');
    navigation.navigate('Solution', {
      title: title,
      desc: desc,
      image: image,
      navigation: navigation
    })
  };

    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity onPress={clickHandler} style={styles.cardContent}>
            <Image source={{uri: image}} style={styles.cardImage}/>
                <View style={ styles.cardContentText}>
                    <Text style={styles.cardContentTitle}>{title}</Text>
                </View>
                {/* <MaterialIcons name="navigate-next" size={40} color="red" /> */}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { x: 0, y: 10 },
        shadowOpacity: 1,
        borderLeftColor: '#eee',
        borderLeftWidth: 10,
        borderRightColor: '#eee',
        borderRightWidth: 10,
        alignSelf: 'stretch',
        backgroundColor: 'white',
        marginTop: 10,
      },
      cardContent: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
      },
      cardContentText: {
        // flexDirection: 'column',
        marginLeft: 10,
        // marginBottom: 10
        justifyContent: 'center'
      },
      cardImage: {
        width: 50, 
        height: 50, 
        alignSelf: 'flex-start'
      },
      cardContentTitle: {
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          marginBottom: 5
      }
});

export default ExploreCardView;