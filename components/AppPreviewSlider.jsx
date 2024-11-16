// components/AppPreviewSlider.jsx
import React, { useState, useRef } from "react";
import { View, ScrollView, Image, Dimensions, Pressable } from "react-native";
import { Video } from "expo-av";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.8; // 80% of screen width

const AppPreviewSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const previewItems = [
    { type: "video", source: require("../assets/preview1.mp4") },
    { type: "image", source: require("../assets/preview2.png") },
    { type: "image", source: require("../assets/preview3.png") },
  ];

  const renderItem = (item, index) => {
    return (
      <View
        key={index}
        className="w-[80%] aspect-[9/16] mx-2 rounded-3xl overflow-hidden bg-white/10 backdrop-blur-lg"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        {item.type === "video" ? (
          <Video
            source={item.source}
            className="w-full h-full rounded-3xl"
            resizeMode="cover"
            isLooping
            shouldPlay
            isMuted
          />
        ) : (
          <Image
            source={item.source}
            className="w-full h-full rounded-3xl"
            resizeMode="cover"
          />
        )}
      </View>
    );
  };

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / ITEM_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View className="w-full h-[60%] justify-center items-center">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={ITEM_WIDTH}
        contentContainerStyle={{
          paddingHorizontal: (width - ITEM_WIDTH) / 2,
        }}
      >
        {previewItems.map((item, index) => renderItem(item, index))}
      </ScrollView>

      {/* Dots indicator */}
      <View className="flex-row justify-center mt-4">
        {previewItems.map((_, index) => (
          <View
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              index === activeIndex ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default AppPreviewSlider;
