// StatsCard.jsx
import { View, Text, StyleSheet } from "react-native";
import React from "react";

export const StatsCard = () => (
  <View className="bg-gray-800 flex w-[100%] h-[40%] rounded-3xl p-6">
    <View>
      <Text className="text-white text-start px-6 w-full">Today</Text>
    </View>
    <View className="justify-center items-center flex-1">
      <Text className="text-white text-center text-4xl font-bold">4h 36m</Text>
      <Text className="text-white text-center text-sm font-ReadexPro font-regular">
        SCREEN TIME TODAY
      </Text>
    </View>
    <View className="flex-row w-full justify-between px-4 pb-8">
      <View style={styles.textContainer}>
        <Text style={styles.text}>MOST USED</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>AURA POINTS</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>PICKUPS</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "light",
  },
});
