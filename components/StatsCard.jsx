// StatsCard.jsx
import { View, Text } from "react-native";
import React from "react";

export const StatsCard = ({ progress, day }) => (
  <View className="bg-gray-800 rounded-3xl p-6 gap-7">
    <Text className="text-white">today productivity</Text>
    <View className="items-center flex-row justify-between">
      <Text style={{ color: "#3b82f6", fontSize: 20 }}>{progress}</Text>
      <View
        style={{
          backgroundColor: "#2c2d31",
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: 9999,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#a0a0a0", marginRight: 4 }}>{day}</Text>
        <View
          style={{
            width: 8,
            height: 8,
            backgroundColor: "#3b82f6",
            borderRadius: 9999,
          }}
        />
      </View>
    </View>
  </View>
);
