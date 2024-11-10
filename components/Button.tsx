import React from "react";

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  label: string;
  theme?: string;
  font?: string;
  onPress?: () => void;
};

export default function Button({ label, theme, font, onPress }: Props) {
  if (theme === "createAccount") {
    return (
      <View style={[styles.buttonContainer, styles.signinContainer, ,]}>
        <LinearGradient
          colors={["#ff0000", "#FA4032"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <TouchableOpacity
            style={[styles.button, styles.signinButton]}
            onPress={onPress}
          >
            <FontAwesome
              name="sign-in"
              size={18}
              color="#ffffff"
              style={styles.buttonIcon}
            />
            <Text
              style={[
                styles.buttonLabel,
                styles.signinLabel,
                { fontFamily: font },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }

  if (theme === "haveAccount") {
    return (
      <View style={[styles.buttonContainer, styles.signinContainer]}>
        <TouchableOpacity
          style={[styles.button, styles.signinButton]}
          onPress={onPress}
        >
          <Text
            style={[
              styles.buttonLabel,
              styles.signinLabel,
              { fontFamily: font },
            ]}
          >
            {label}
          </Text>

          <FontAwesome
            name="chevron-right"
            size={17}
            color="#ffffff"
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }
  if (theme === "SignIn") {
    return (
      <TouchableOpacity
        className="mt-6 bg-red-500 py-4 rounded-xl items-center"
        onPress={onPress}
      >
        <Text className="text-white font-bold text-lg">Sign In</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    paddingHorizontal: 8,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  signinContainer: {
    borderRadius: 15,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  signinButton: {
    backgroundColor: "transparent",
  },
  signinLabel: {
    color: "#ffffff",
  },
  gradient: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
});
