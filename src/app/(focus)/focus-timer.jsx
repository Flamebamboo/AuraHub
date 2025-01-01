import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { useTimer } from '@/hooks/useTimer';
import { TimerDisplay } from '@/components/Timer/TimerDisplay';
import SplitButton from '@/components/SplitButton';
import { TimerArt } from '@/components/TimerArt/TimerArt';
import { faTag, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import useTimerStore from '@/store/timerStore';
import useTimerVariant from '@/store/timerVariantStore';
import { saveFocusStats } from '@/lib/focusStats';
import { getByDay } from '@/lib/focusStats';
const FocusTimer = () => {
  const duration = useTimerStore((state) => state.duration);

  const color = useTimerStore((state) => state.color);
  const task = useTimerStore((state) => state.task);

  const currentVariant = useTimerVariant((state) => state.variant);
  const { timeRemaining, isActive, start, pause, stop, getProgress } = useTimer(duration);

  const [isStopping, setIsStopping] = useState(false);

  const handleStop = async () => {
    if (isStopping) return;
    setIsStopping(true);
    const stats = stop();
    if (stats) {
      try {
        await saveFocusStats(stats, task, color);
        console.log('Session stats saved:', stats);
      } catch (error) {
        console.error('Failed to save session stats:', error);
        // Optionally show error to user
      } finally {
        setIsStopping(false);
      }
    } else {
      setIsStopping(false);
    }
    router.replace('/(tabs)/home');
  };

  useEffect(() => {
    start();
    console.log('Timer started');
  }, [start]);

  const [bgColor, setBgColor] = useState('#000');
  const handleBg = (color) => {
    setBgColor(color);
  };

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, flex: 1 }}>
      <View style={styles.contentContainer}>
        <View style={styles.taskContainer}>
          <FontAwesomeIcon icon={faTag} size={22} color={color} />
          <Text style={styles.task}>{task}</Text>
          <FontAwesomeIcon icon={faCaretDown} size={22} color={color} />
        </View>
        <TouchableOpacity onPress={() => router.push('/(shop)/focus-design')}>
          <TimerArt onColorChange={handleBg} variant={currentVariant} progress={getProgress()} />
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
