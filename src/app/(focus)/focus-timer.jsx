import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
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
});

export default FocusTimer;
