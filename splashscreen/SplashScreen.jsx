import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>WEATHER HUNTER</Text>
      <Text style={styles.description}>Discover the weather for any city or zip code in the world!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003366',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#cccccc',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default SplashScreen;
