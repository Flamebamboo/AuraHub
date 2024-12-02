import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';

import { FocusContext } from '@/context/FocusContextProvider';
import { router } from 'expo-router';

import CoffeeCupSvg from '@/components/CoffeeCupSvg';
const FocusTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isFocus, setIsFocus] = useState(false);

  const formatTimeDisplay = (seconds) => {
    if (!seconds) return '00:00';

    // Convert total seconds to minutes (including hours)
    const totalMinutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${totalMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
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
    router.replace('/(tabs)/home');
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
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.cupContainer}>
          <CoffeeCupSvg progress={calculateProgress()} />
        </View>
        <Text style={styles.timerDisplay}>{formatTimeDisplay(timeRemaining)}</Text>
        <TouchableOpacity
          className="w-1/2 px-4 py-6 bg-white rounded-2xl shadow-lg flex items-center justify-center"
          onPress={isFocus ? handleStopFocus : handleStartFocus}
        >
          <Text className="text-black font-semibold text-lg">{isFocus ? 'End' : 'Start Focus'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FocusTimer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#241527',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  timerDisplay: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    fontFamily: 'ReadexPro',
  },
  cupContainer: {
    width: 400,
    height: 400,
    marginBottom: 20,
  },
  timerText: {
    fontSize: 24,
    padding: 50,
    color: '#fff',
    marginBottom: 10,
  },
  modeText: {
    fontSize: 18,
    color: '#666',
  },
});
