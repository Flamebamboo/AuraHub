// StatsCard.jsx
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import React from 'react';

export const StatsCard = () => (
  <View className="bg-gray-800 flex w-[100%] h-80 rounded-3xl p-6">
    <View className="flex-row justify-between items-center w-full px-4">
      <Text className="text-white text-start">Today</Text>
    </View>
    <View className="justify-center items-center flex-1">
      <Text className="text-white text-center text-4xl font-bold">3h 20m</Text>
      <Text className="text-white text-center text-sm font-ReadexPro font-regular">
        TOTAL FOCUS TIME
      </Text>
    </View>
    <View className="flex-row w-full justify-between px-4 pb-8">
      <View style={styles.textContainer}>
        <Text style={styles.text}>SESSIONS</Text>
        <Text style={styles.stat}>5</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>FLASHCARDS</Text>
        <Text style={styles.stat}>20</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>HUBS</Text>
        <Text style={styles.stat}>3</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '300',
  },
  stat: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
