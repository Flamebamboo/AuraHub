import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { useTimer } from '@/hooks/useTimer';
import { TimerDisplay } from '@/components/Timer/TimerDisplay';
import SplitButton from '@/components/SplitButton';
import { TimerArt, TimerArtVariants } from '@/components/TimerArt';
import { faTag, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import useTimerStore from '@/store/timerStore';

import useTimerVariant from '@/store/timerVariantStore';
const FocusTimer = () => {
  const duration = useTimerStore((state) => state.duration);

  const color = useTimerStore((state) => state.color);
  const task = useTimerStore((state) => state.task);

  const timerVariant = useTimerVariant((state) => state.variant);
  const { timeRemaining, isActive, start, pause, stop, getProgress } = useTimer(duration);

  const handleStop = () => {
    stop();
    router.replace('/(tabs)/home');
  };

  useEffect(() => {
    start();
    console.log('Timer started');
  }, [start]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.taskContainer}>
          <FontAwesomeIcon icon={faTag} size={22} color={color} />
          <Text style={styles.task}>{task}</Text>
          <FontAwesomeIcon icon={faCaretDown} size={22} color={color} />
        </View>
        <TouchableOpacity onPress={() => router.replace('/(shop)/focus-design')}>
          <TimerArt variant={timerVariant} progress={getProgress()} />
        </TouchableOpacity>

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
    width: 160,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 5,
  },

  task: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FocusTimer;
