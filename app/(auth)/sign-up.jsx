import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import { router } from "expo-router";

import createUser from "@/lib/appwrite";
const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    createUser();
    console.log("djsjds");
  };

  return (
    <SafeAreaView className="h-full bg-primary-custom-blue">
      <ScrollView>
        <View className="pt-10">
          <Text className="pt-10 font-bold text-7xl text-white underline decoration-red-500 text-center mb-3">
            StudyHub
          </Text>
          <Text className="mb-32 text-center text-white text-xl font-semibold">
            Create Account
          </Text>
        </View>
        <View className="min-h-[85vh]">
          <FormField
            title="Username"
            value={form.username}
            placeholder="Enter your username"
            handleChangeText={(e) => setForm({ ...form, username: e })}
          />

          <FormField
            title="Email"
            value={form.email}
            placeholder="Enter your email"
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            placeholder="Enter your password"
            handleChangeText={(e) => setForm({ ...form, password: e })}
            iconName="lock-closed-outline"
            secureTextEntry
          />
          <Button theme="SignIn" label="Sign Up" onPress={submit}></Button>
          <View className="flex-row justify-center mt-8">
            <Text className="text-white">Already have an account? </Text>
            <TouchableOpacity onPress={console.log("Sign in pressed")}>
              <Text className="text-red-500">Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
