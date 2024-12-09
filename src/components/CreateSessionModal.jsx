import React, { useState, useCallback, useRef, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import SessionButtons from './SessionButtons';
import DurationModal from './DurationModal';
import { FocusContext } from '../context/FocusContextProvider';
import { router } from 'expo-router';
import { faTag, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import TaskSelector from '@/components/TaskSelector';
import { CustomSvg } from '@/components/CustomSvg';
import CustomButton from '@/components/CustomButton';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';
import SegmentadControl from '@/components/SegmentadControl';
import Slider from '@react-native-community/slider';
import TimerBlock from '@/components/TimerBlock';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const CreateSessionModal = ({ bottomSheetModalRef }) => {
  const snapPoints = ['100%'];

  const [duration, setDuration] = useState(null);

  const durationModalRef = useRef(null);
  const taskSelectorRef = useRef(null);
  //using useState to keep track of the options

  //this duration is in SECONDS passed from duration modal component
  const { focusData, setFocusData } = useContext(FocusContext);
  // const [duration, setDuration] = useState(null);
  const [mode, setMode] = useState(null);
  const [selectedTask, setSelectedTask] = useState('Select Task');
  const [displayColor, setDisplayColor] = useState('#FF0000');
  //sending data to context api

  const handleCreateSession = () => {
    bottomSheetModalRef.current?.dismiss();
    setFocusData({
      duration: duration || focusData.duration, // Use current or default
      mode: mode || focusData.mode,
      selectedTask: selectedTask || focusData.selectedTask,
    });
    router.replace('/(focus)/focus-timer');
  };

  //remembering the picker values
  const [selectedHours, setSelectedHours] = useState('0');
  const [selectedMinutes, setSelectedMinutes] = useState('30');

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
          selectedTask={selectedTask}
          displayColor={displayColor}
          handleOpenDuration={handleOpenDuration}
          handleCreateSession={handleCreateSession}
          duration={duration}
        />
      ) : (
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      )}

      {isTaskSelectorVisible && (
        <TaskSelector
          selectedTask={setSelectedTask}
          displayColor={setDisplayColor}
          taskSelectorRef={taskSelectorRef}
          onClose={handleCloseTask}
        />
      )}

      {isDurationModalVisible && (
        <DurationModal
          durationSheetRef={durationModalRef}
          onClose={handleCloseDuration}
          onSelect={(totalSeconds, hours, minutes) => {
            setDuration(totalSeconds); //this is to be sent to focus session easier to format
            setSelectedHours(hours); // hours and minutes if for picker
            setSelectedMinutes(minutes);
            handleCloseDuration();
          }}
          pickerHours={selectedHours}
          pickerMinutes={selectedMinutes} //passing the state to the modal
        />
      )}
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
