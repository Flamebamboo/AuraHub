import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { getCurrentUser, signIn, signOut } from "@/lib/appwrite";

import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { AuthTest } from "@/components/AuthTest";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    console.log("User signed out.");
    router.replace("/(auth)/sign-in");
  };
  const customUser = async () => {
    await signIn("acap@acap.com", "123123123");
    router.replace("/home");
  };
  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <SafeAreaView
      className="flex-1 bg-primary-custom-lightpink"
      edges={["top", "left", "right"]}
    >
      <View className="flex-1">
        {/* over empty section here i intent to put pixel art stuff like characters hanging over*/}
      </View>

      <View className=" bg-primary-custom-purple rounded-t-[30px] min-h-[80%]">
        <View className="pt-16">
          <Text className="mb-4 text-center font-extrabold text-primary-custom-pink text-3xl">
            HEY, <Text className="text-white"> WELCOME BACK!</Text>
          </Text>
        </View>

        <View className="flex-1 px-12 pt-8">
          <FormField
            title="Enter your email or username"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
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
            className="mb-1 items-center"
            onPress={() => console.log("Forgot password pressed")}
          >
            <Text className="text-[#218CFF] underline">Forgot password?</Text>
          </TouchableOpacity>

          <CustomButton
            variant="outline"
            label={isSubmitting ? "Signing in..." : "Log In"}
            fontSize={20}
            fontFamily="BhalooBold"
            onPress={submit}
            width={280}
            style={{ alignSelf: "center", marginTop: 30, marginBottom: 30 }}
            disabled={isSubmitting}
          ></CustomButton>

          <View className="w-full h-[1px] bg-gray-300 my-6" />

          <View className="gap-y-4">
            <CustomButton
              variant="solid"
              label="Sign Up With Google"
              fontSize={18}
              iconName="google"
            ></CustomButton>

            <CustomButton
              variant="solid"
              label="Sign Up With Apple"
              fontSize={18}
              backgroundColor="#000"
            ></CustomButton>
          </View>

          <View className="flex-row justify-center mt-5">
            <TouchableOpacity onPress={() => router.replace("/sign-up")}>
              <Text className="text-gray-300 underline font-extrabold text-lg">
                Create an account?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignIn;
