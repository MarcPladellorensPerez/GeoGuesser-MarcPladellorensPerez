import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import getDistance from 'geolib/es/getDistance';
import { Button, Text } from 'react-native-paper';

const PantallaJuego = () => {
  const [questionsList, setQuestionsList] = useState([]);
  const [currentQuestionIndex, setQuestionIndex] = useState(0);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [markerDbPosition, setMarkerDbPosition] = useState(null);
  const [distance, setDistance] = useState(null);
  const [points, setPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const [showCheckLocation, setShowCheckLocation] = useState(true);
  const { navigate } = useNavigation();
  const mapRef = useRef(null);

  const setCurrentQuestion = (question) => {
      // Lógica para establecer la pregunta actual
  };

  const handleMapPress = (event) => {
      const { coordinate } = event.nativeEvent;
      setMarkerPosition(coordinate);
  };

  const checkLocation = () => {
      setShowCheckLocation(false);
      if (markerPosition) {
          const { latitude, longitude } = markerPosition;
          const correctLocation = {
              latitude: parseFloat(questionsList[currentQuestionIndex].Lat),
              longitude: parseFloat(questionsList[currentQuestionIndex].Lon),
          };

          const dist = getDistance(
              { latitude: correctLocation.latitude, longitude: correctLocation.longitude },
              { latitude, longitude }
          );

          setDistance(dist);
          calculatePoints(dist);
          setMarkerDbPosition(correctLocation);
          setShowPoints(true);
      }
  };

  const calculatePoints = (distMeters) => {
      let newPoints = 0;

      if (distMeters >= 0 && distMeters <= 300000) {
          newPoints = 100;
      } else if (distMeters > 300000 && distMeters <= 700000) {
          newPoints = 50;
      } else if (distMeters > 700000 && distMeters <= 1100000) {
          newPoints = 20;
      } else if (distMeters > 1100000 && distMeters <= 1500000) {
          newPoints = 10;
      }

      setPoints(newPoints);
      setTotalPoints(prevTotalPoints => prevTotalPoints + newPoints);
  };

  const nextQuestion = () => {
      setShowCheckLocation(true);
      setShowPoints(false);
      setQuestionIndex(currentQuestionIndex + 1);
      setMarkerPosition(null);
      setMarkerDbPosition(null);
  };

  useEffect(() => {
      const fetchQuestions = async () => {
          try {
              const qCol = collection(db, 'Ubicaciones');
              const questionsSnapshot = await getDocs(qCol);
              const qList = questionsSnapshot.docs.map((doc) => doc.data());
              setQuestionsList(qList);
              if (qList.length > 0) {
                  setCurrentQuestion(qList[0]);
              }
          } catch (error) {
              console.error('Error fetching questions:', error);
          }
      };

      fetchQuestions();
  }, []);

  return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                onPress={handleMapPress}
            >
                {markerPosition && <Marker coordinate={markerPosition} />}
                {markerDbPosition && <Marker coordinate={markerDbPosition} />}
                {markerPosition && markerDbPosition && (
                    <Polyline
                        coordinates={[markerPosition, markerDbPosition]}
                        strokeColor="#FF5733"
                        strokeWidth={2}
                    />
                )}
            </MapView>
            {showPoints && <Text style={styles.points}>{`Puntos: ${points}`}</Text>}
            {showCheckLocation && (
                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={checkLocation}
                >
                    Verificar Ubicación
                </Button>
            )}
            {showPoints && (
                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={nextQuestion}
                >
                    Siguiente Pregunta
                </Button>
            )}
            <Text style={styles.question}>{questionsList[currentQuestionIndex]?.Title}</Text>
            <Text style={styles.totalPoints}>{`Puntos Totales: ${totalPoints}`}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F7F6',
    },
    map: {
        flex: 1,
    },
    points: {
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 20,
        alignSelf: 'center',
    },
    question: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#333',
    },
    totalPoints: {
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333',
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 20,
        marginHorizontal: 20,
        paddingHorizontal: 10,
    },
});

export default PantallaJuego;