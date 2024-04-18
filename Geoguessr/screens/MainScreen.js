import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text, ImageBackground } from "react-native";

const MainScreen = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate('Game');
  };

  return (
    <ImageBackground source={require('../assets/ImageBackground.png')} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>PLAY</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: '100%', // Ajusta el ancho de la imagen
        height: '100%', // Ajusta la altura de la imagen
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnContainer: {
        backgroundColor: '#4CAF50', // Cambia el color de fondo a verde
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
        color: 'white', // Cambia el color del texto a blanco
        fontWeight: 'bold',
    },
});

export default MainScreen;
