import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Image, ImageSource } from "expo-image";

const placeHolderImage = require("/Users/acap/StickerSmash/assets/images/background-image.png");

type Props = {
  imgSource: ImageSource;
};

export default function ImageViewer({ imgSource }: Props) {
  return <Image source={imgSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
