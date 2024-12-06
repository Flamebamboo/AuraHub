import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { FocusContext } from '@/context/FocusContextProvider';
import { useTimer } from '@/hooks/useTimer';
import { TimerDisplay } from '@/components/TimerDisplay';
import SplitButton from '@/components/SplitButton';
import { TimerArt, TimerArtVariants } from '@/components/TimerArt';
import { faTag, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
const FocusTimer = () => {
  const { focusData } = useContext(FocusContext);
  const { timeRemaining, isActive, start, pause, stop, getProgress } = useTimer(focusData.duration);

import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { FocusContext } from '@/context/FocusContextProvider';
import { useTimer } from '@/hooks/useTimer';
import { TimerDisplay } from '@/components/TimerDisplay';
import SplitButton from '@/components/SplitButton';
import { TimerArt, TimerArtVariants } from '@/components/TimerArt';
const FocusTimer = () => {
  const { focusData } = useContext(FocusContext);
  const { timeRemaining, isActive, start, pause, stop, getProgress } = useTimer(focusData.duration);

  const handleStop = () => {
    stop();
    router.replace('/(tabs)/home');
  };
  console.log(focusData);

  useEffect(() => {
    start();
    console.log('Timer started');
  }, [start]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Focusing on:</Text>
        <View style={styles.taskContainer}>
          <FontAwesomeIcon icon={faTag} size={22} color={focusData.taskColor} />
          <Text style={styles.task}>{focusData.selectedTask}</Text>
          <FontAwesomeIcon icon={faCaretDown} size={22} color={focusData.taskColor} />
        </View>
        <TimerArt variant={TimerArtVariants.COFFEE_CUP} progress={getProgress()} style={styles.artContainer} />
        <TimerDisplay time={timeRemaining} />
        <SplitButton
          splitted={!isActive}
          leftAction={{
            label: 'resume',
            onPress: start,
          }}
          mainAction={{
            label: isActive ? 'pause' : 'start',
            onPress: isActive ? pause : start,
          }}
          rightAction={{
            label: 'end',
            onPress: handleStop,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

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
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    width: 150,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  task: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

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

export default FocusTimer;
