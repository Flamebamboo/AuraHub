import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const placeHolderImage = require("@/assets/images/background-image.png");

const index = () => {
  const [selectedImg, setSelectedImg] = useState("");
  const [showAppOptions, setShowAppOptions] = useState(false);
  const pickImageAsync = async () => {
    //launchImageLibaryAsync recieves an object of ImagePickerOptions
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // when this is true it allows users to edit the images during selection
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImg(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View className="flex-1 bg-black items-center">
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={placeHolderImage} selectedImg={selectedImg} />
      </View>
      {showAppOptions ? (
        <View />
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Choose a photo"
            theme="primary"
            onPress={pickImageAsync}
          />
          <Button label="Use this photo" />
        </View>
      )}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
