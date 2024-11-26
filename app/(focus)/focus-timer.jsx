import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';

const FocusTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState();
  const [isFocus, setIsFocus] = useState(false);
  const [selectedTime, setSelectedTime] = useState();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60); //convert seconds to minutes formula
    const secs = seconds % 60; //get the remainder of the seconds
    return `${mins}:${secs.toString().padStart(2, '0')}`; //return the minutes and seconds
  };

  const handleStartFocus = () => {
    setIsFocus(true);
    setTimeRemaining(selectedTime);
  };

  const handleStopFocus = () => {
    setIsFocus(false);
    setTimeRemaining(selectedTime);
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
      <View style={styles.container}>
        {!isFocus ? (
          <Picker
            selectedValue={selectedTime}
            onValueChange={(itemValue) => setSelectedTime(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="25:00" value={25 * 60} />
            <Picker.Item label="15:00" value={15 * 60} />
            <Picker.Item label="45:00" value={45 * 60} />
          </Picker>
        ) : null}

        <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>

        <View style={styles.buttonContainer}>
          {/* Button For Start */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsFocus(!isFocus)}
          >
            <Text style={styles.buttonText}>{isFocus ? 'Pause' : 'Start'}</Text>
          </TouchableOpacity>
          {/* Button For Reset */}
          <TouchableOpacity style={styles.button} onPress={handleStopFocus}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FocusTimer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: 200,
    height: 50,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
