import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const CardView = ({title, desc, image}) => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardContent}>
                <View style={ styles.cardContentText}>
                    <Text style={styles.cardContentTitle}>{title}</Text>
                    <Text>{desc}</Text>
                </View>
                <Image source={{uri: image}} style={styles.cardImage}/>
                {/* <MaterialIcons name="navigate-next" size={40} color="red" /> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        paddingTop: 30,
        paddingBottom: 30,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { x: 0, y: 10 },
        shadowOpacity: 1,
        borderLeftColor: '#eee',
        borderLeftWidth: 10,
        borderRightColor: '#eee',
        borderRightWidth: 10,
        alignSelf: 'stretch',
        backgroundColor: 'white',
        marginTop: 20,
      },
      cardContent: {
        // flexDirection: 'column',
        // justifyContent: 'space-between',
        // alignItems: 'center',
      },
      cardContentText: {
        flexDirection: 'column',
        marginLeft: 10,
        marginBottom: 10
      },
      cardImage: {
        width: '95%', 
        height: 200, 
        alignSelf: 'center'
      },
      cardContentTitle: {
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          marginBottom: 5
      }
});

export default CardView;