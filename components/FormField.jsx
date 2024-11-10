"use client";

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  iconName,
  secureTextEntry,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="mb-4">
      <Text className="text-base text-gray-200 font-medium">{title}</Text>
      <View className="w-full h-14 px-4 bg-gray-800 rounded-xl border border-gray-700 focus-within:border-red-500 flex-row items-center">
        <Ionicons name={iconName} size={20} color="#7B7B8B" />
        <TextInput
          className="flex-1 ml-3 text-white font-semibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#7B7B8B"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default function Component() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement login logic here
    console.log("Login pressed");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 "
    >
      <View className="flex-1 justify-center px-8">
        <View className="items-center pb-40">
          <Text className="mt-4 text-6xl font-bold text-white underline decoration-red-500">
            StudyHub
          </Text>
          <Text className="mt-2 text-gray-400">Sign in to your account</Text>
        </View>

        <FormField
          title="Email"
          value={email}
          placeholder="Enter your email"
          handleChangeText={setEmail}
          iconName="mail-outline"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FormField
          title="Password"
          value={password}
          placeholder="Enter your password"
          handleChangeText={setPassword}
          iconName="lock-closed-outline"
          secureTextEntry
        />

        <TouchableOpacity
          className="mt-2 self-end"
          onPress={() => console.log("Forgot password pressed")}
        >
          <Text className="text-red-500 font-medium">Forgot password?</Text>
        </TouchableOpacity>
        <Button theme="SignIn" label="sign in"></Button>
        <View className="mt-8 flex-row justify-center">
          <Text className="text-gray-400">Don't have an account? </Text>
          <TouchableOpacity onPress={() => console.log("Sign up pressed")}>
            <Text className="text-red-500 font-medium">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
