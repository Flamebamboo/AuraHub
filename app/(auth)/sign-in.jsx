import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import { router } from "expo-router";
const SignIn = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  return (
    <SafeAreaView className="bg-primary-custom-blue flex-1">
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View className="px-5">
          <Text className="font-bold text-7xl text-white underline decoration-red-500 text-center mb-3">
            StudyHub
          </Text>
          <Text className="mb-32 text-center text-white text-xl font-semibold">
            Log in to your account
          </Text>
          <FormField
            title="Enter your email or username"
            value={form.email || form.username}
            handleChangeText={(e) => {
              if (e.includes("@")) {
                setForm({ ...form, email: e });
              } else {
                setForm({ ...form, username: e });
              }
            }}
            placeholder="username or email"
            keyboardType="email-address"
          />
          <FormField
            title="Enter your password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            placeholder="password"
            secureTextEntry
          />
          <TouchableOpacity
            className="self-end mb-6 me-6"
            onPress={() => console.log("Forgot password pressed")}
          >
            <Text className="text-red-500 font-bold">Forgot password?</Text>
          </TouchableOpacity>
          <Button theme="SignIn" label="Sign In" />
          <View className="flex-row justify-center mt-8">
            <Text className="text-white">Don't have an account? </Text>
            <TouchableOpacity onPress={console.log("Sign up pressed")}>
              <Text className="text-red-500">Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1, //still dont understand what this means i forgot not sure why Scrollview cant use classname
    justifyContent: "center",
  },
});

export default SignIn;
