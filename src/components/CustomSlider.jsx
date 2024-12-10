import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';

const CustomSlider = ({ label, minVal, maxVal, step, onValueChange }) => {
  const [value, setValue] = useState(value ?? 0);
  return (
    <View>
      <Text className="text-white font-semibold text-xl ml-5 mb-4 ">
        {label}: {value && +value.toFixed(2)}
      </Text>
      <View className="w-full flex items-center">
        <Slider
          minimumValue={minVal}
          maximumValue={maxVal}
          style={styles.slider}
          step={step}
          onValueChange={onValueChange}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          value={value}
        />
      </View>
    </View>
  );
};

export default CustomSlider;

const styles = StyleSheet.create({
  slider: {
    width: 330,
  },
});
