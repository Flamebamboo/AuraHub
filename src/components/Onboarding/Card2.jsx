import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';

const { width, height } = Dimensions.get('window');

export default function Card2() {
  return (
    <View style={styles.slide}>
      <Text style={styles.title}>Welcome to PixFocus</Text>
      <Text style={styles.description}>Be more productive with pixel art visual timers</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    width,
    height,
    justifyContent: 'flex-start',
    paddingTop: 150,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#2F1818',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'PixelifySans',
  },
  description: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 30,
    color: '#fff',
  },
});
