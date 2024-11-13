import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import { router } from "expo-router";
import { createUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

      router.replace("@/(tabs/home)");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
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
            <TouchableOpacity onPress={() => router.replace("/sign-in")}>
              <Text className="text-red-500">Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
