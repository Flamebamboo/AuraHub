import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

type ButtonProps = {
  label: string;
  theme?: string;
  onPress?: () => void;
};

export default function Button({ label, theme, onPress }: ButtonProps) {
  // Default button style

  return (
    <TouchableOpacity
      onPress={onPress}
      className={"bg-blue-500 p-4 rounded-xl "}
    >
      <Text className="text-white">{label}</Text>
    </TouchableOpacity>
  );
}
