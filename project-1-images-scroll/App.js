import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { getRickAndMortyCharacters } from './lib/simple_rick_and_morty_api';

export default function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getRickAndMortyCharacters().then((characters) => {
      setCharacters(characters);
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {characters.map((character) => (
        // Ensure you return the View component inside the map function
        <View key={character.id} style={styles.card}>
          <Image
            source={{ uri: character.image }}
            style={styles.image}
            onError={(error) =>
              console.log('Image load error:', error.nativeEvent)
            }
          />
          <Text style={styles.title}>{character.name}</Text>
          <Text style={styles.gender}>{character.gender}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d171ea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    margin: 10, // Add some spacing between cards
  },
  image:{
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  title:{
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  gender:{
    fontSize: 16,
    color: "#fff",
  }
});
