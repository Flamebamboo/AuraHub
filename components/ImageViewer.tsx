import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Image, ImageSource } from "expo-image";

const placeHolderImage = require("/Users/acap/StickerSmash/assets/images/background-image.png");

type Props = {
  imgSource: ImageSource;
  selectedImg?: string;
};

export default function ImageViewer({ imgSource, selectedImg }: Props) {
  const imageSource = selectedImg ? { uri: selectedImg } : imgSource;
  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
