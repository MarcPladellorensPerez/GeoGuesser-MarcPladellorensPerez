import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

const PantallaPrincipal = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate('Game');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Comenzar Juego</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundPic: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    },
    btnContainer: {
        backgroundColor: 'white',
        borderRadius: 50,
        width: 200,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
    },
    btn: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 18,
        color: 'rgba(31, 41, 55, 1)',
        fontWeight: 'bold',
    },
});

export default PantallaPrincipal;