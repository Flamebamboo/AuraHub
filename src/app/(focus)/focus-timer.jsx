import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { FocusContext } from '@/context/FocusContextProvider';

import CustomButton from '@/components/CustomButton';
import CoffeeCupSvg from '@/components/CoffeeCupSvg';
const FocusTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isFocus, setIsFocus] = useState(false);

  //duration is in SECONDS passed from duration modal component
  const formatTime = (duration) => {
    if (!duration) {
      return '30 mins';
    }

    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);

    if (hours > 0) {
      if (minutes > 0) {
        return `${hours}h ${minutes}m`;
      }
      return `${hours}h`;
    }
    return `${minutes}m`;
  };

  //recieve the focus data from the context api
  const { focusData } = useContext(FocusContext);

  const handleStartFocus = () => {
    setIsFocus(true);
    setTimeRemaining(focusData.duration);
  };

  const handleStopFocus = () => {
    setIsFocus(false);
    setTimeRemaining(focusData.duration);
  };

  const calculateProgress = () => {
    if (!timeRemaining || !focusData.duration) return 0;
    const progress = 1 - timeRemaining / focusData.duration;
    console.log('Calculated progress:', progress); // Add this to debug
    return progress;
  };

  useEffect(() => {
    let interval = null;

    if (isFocus && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((timeRemaining) => timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsFocus(false);
    }

    return () => {
      clearInterval(interval); //clear the interval when the component unmounts
    };
  }, [timeRemaining, isFocus]); //run the effect when the timeRemaining or isFocus changes - called [] dependencies

  return (
    <SafeAreaView>
      <View>
        <CustomButton
          variant="solid"
          label="Focus"
          fontSize={18}
          iconName="google"
          onPress={handleStartFocus}
        ></CustomButton>
        <CustomButton
          variant="solid"
          label="Stop Focus"
          fontSize={18}
          iconName="google"
          onPress={handleStopFocus}
        ></CustomButton>

        <View className="bg-slate-500">
          <CoffeeCupSvg progress={calculateProgress()} />
        </View>

        <Text>Duration: {formatTime(focusData.duration)}</Text>
        <Text>Mode: {focusData.mode}</Text>
      </View>
    </SafeAreaView>
  );
};

export default FocusTimer;

const style = create.StyleSheet({
  container: {},
});
