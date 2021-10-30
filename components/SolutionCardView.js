import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

const SolutionCardView = ({title, desc, image}) => {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.cardContentTitle}>{title}</Text>
            <Text>{desc}</Text>
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
        borderRightColor: '#eee',
        alignSelf: 'stretch',
        backgroundColor: 'white',
        marginTop: 10,
        elevation: 1
      },
      cardContentTitle: {
        fontWeight: 'bold',
        marginBottom: 5
      },
});

export default SolutionCardView;