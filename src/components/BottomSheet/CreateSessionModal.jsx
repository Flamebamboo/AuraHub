import React, { useState, useCallback, useRef, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Pressable, Alert } from 'react-native';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';

import DurationModal from '@/components/BottomSheet/DurationModal';

import { router } from 'expo-router';
import { faTag, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import TaskSelector from '@/components/BottomSheet/TaskSelector';
import { CustomSvg } from '@/components/CustomSvg';
import CustomButton from '@/components/Onboarding/CustomButton';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';
import SegmentadControl from '@/components/SegmentadControl';

import TimerBlock from '@/components/Timer/TimerBlock';
import Pomodoro from '@/components/Timer/Pomodoro';
import useTimerStore from '@/store/timerStore';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const CreateSessionModal = ({ bottomSheetModalRef }) => {
  const snapPoints = ['100%'];

  const durationModalRef = useRef(null);
  const taskSelectorRef = useRef(null);
  //using useState to keep track of the options

  //sending data to context api

  const task = useTimerStore((state) => state.task);

  const handleCreateSession = () => {
    if (task === 'Select Task') {
      Alert.alert('Invalid Task', 'Please select a task before creating a session');
      return;
    }
    bottomSheetModalRef.current?.dismiss();
    router.replace('/(focus)/enter-loading');
  };

  const handleCreatePomodoro = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  // Pomodoro Stuff

  // visibility of the options modal
  const [isDurationModalVisible, setIsDurationModalVisible] = useState(false);
  const [isTaskSelectorVisible, setIsTaskSelectorVisible] = useState(false);
  const [isModeVisible, setIsModeVisible] = useState(false);

  //handle opening modal
  const handleOpenDuration = useCallback(() => {
    setIsDurationModalVisible(true);
  }, []);

  const handleCloseDuration = useCallback(() => {
    setIsDurationModalVisible(false);
  }, []);

  const handleOpenTask = useCallback(() => {
    setIsTaskSelectorVisible(true);
  }, []);
  const handleCloseTask = useCallback(() => {
    setIsTaskSelectorVisible(false);
  }, []);

  // MAIN MODAL

  const [selectedMode, setSelectedMode] = useState('timeblock');

  // darkbackdrop behind the modal
  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleClossPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enableContentPanningGesture={false}
      enablePanDownToClose={true} //u can hold n slide down to close
      backgroundStyle={styles.modalBackground}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.exitButton} onPress={handleClossPress}>
          <Ionicons name="close" size={32} color="white" />
        </TouchableOpacity>
        <SegmentadControl selectedMode={selectedMode} setSelectedMode={setSelectedMode} />
      </View>

      {selectedMode === 'timeblock' ? (
        <TimerBlock
          handleClossPress={handleClossPress}
          handleOpenTask={handleOpenTask}
          handleOpenDuration={handleOpenDuration}
          handleCreateSession={handleCreateSession}
        />
      ) : (
        <Pomodoro handleOpenTask={handleOpenTask} handleCreatePomodoro={handleCreatePomodoro} />
      )}

      {isTaskSelectorVisible && <TaskSelector taskSelectorRef={taskSelectorRef} onClose={handleCloseTask} />}

      {isDurationModalVisible && <DurationModal durationSheetRef={durationModalRef} onClose={handleCloseDuration} />}
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: '#141414',
  },

  exitButton: {
    position: 'absolute',
    top: 35,
    left: 20,
  },

  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingBottom: 10,
  },
});
