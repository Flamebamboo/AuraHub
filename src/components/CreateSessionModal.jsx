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
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const CreateSessionModal = ({ bottomSheetModalRef }) => {
  const snapPoints = ['90%'];
  const [selectedTaskName, setSelectedTaskName] = useState(null);

  const durationModalRef = useRef(null);
  const taskSelectorRef = useRef(null);
  //using useState to keep track of the options

  //this duration is in SECONDS passed from duration modal component
  const { setFocusData } = useContext(FocusContext);
  const [duration, setDuration] = useState(null);
  const [mode, setMode] = useState(null);
  const [selectedTask, setSelectedTask] = useState('Select Task');
  const [displayColor, setDisplayColor] = useState('#FF0000');
  //sending data to context api

  const handleCreateSession = () => {
    bottomSheetModalRef.current?.dismiss();
    setFocusData({ duration, mode, selectedTask });
    console.log(selectedTask);
    router.replace('/(focus)/focus-timer');
  };

  //remembering the picker values
  const [selectedHours, setSelectedHours] = useState('0');
  const [selectedMinutes, setSelectedMinutes] = useState('30');

  //display time for alt besides button
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

  // visibility of the options modal
  const [isDurationModalVisible, setIsDurationModalVisible] = useState(false);
  const [isTaskSelectorVisible, setIsTaskSelectorVisible] = useState(false);
  const [isModeVisible, setIsModeVisible] = useState(false);

  const [showDoneButton, setShowDoneButton] = useState(false);

  const handleTaskSelect = (taskName) => {
    setShowDoneButton(true);
  };
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
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enableContentPanningGesture={false}
      enablePanDownToClose={true} //u can hold n slide down to close
      backgroundStyle={styles.modalBackground}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.title}>Create New Session</Text>
        <TouchableOpacity style={styles.exitButton} onPress={handleClossPress}>
          <Ionicons name="close" size={32} color="white" />
        </TouchableOpacity>
        <View className="flex-row items-center">
          <Text className="text-white font-ReadexPro font-bold text-xl">Task Goal</Text>
          <View className="px-8">
            <TouchableOpacity
              className="bg-[#2C2C2C] flex flex-row justify-between items-center py-2 px-4 rounded-full"
              onPress={handleOpenTask}
            >
              <FontAwesomeIcon icon={faTag} size={22} color={displayColor} />
              <Text className="text-white text-2sm font-bold mx-4 ">{selectedTask}</Text>
              <FontAwesomeIcon icon={faCaretDown} size={22} color="#ffffff" />
            </TouchableOpacity>
            {isTaskSelectorVisible && (
              <TaskSelector
                selectedTask={setSelectedTask}
                displayColor={setDisplayColor}
                taskSelectorRef={taskSelectorRef}
                onClose={handleCloseTask}
                selectedTaskName={selectedTaskName}
                setSelectedTaskName={setSelectedTaskName}
                onTaskSelect={handleTaskSelect}
              />
            )}
          </View>
        </View>
        <View style={styles.optionContainer}>
          <SessionButtons
            label="Duration"
            leftIcon={'hourglass'}
            rightIcon={'chevron-right'}
            altLabel={formatTime(duration)}
            onPress={handleOpenDuration}
          />

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

          <SessionButtons
            label="Apps Blocked"
            leftIcon={'hourglass'}
            rightIcon={'chevron-right'}
            altLabel="Block List"
          />
          <SessionButtons label="Mode" leftIcon={'hourglass'} rightIcon={'chevron-right'} altLabel="Trust Mode" />
          <SessionButtons
            label="Schedule for later"
            leftIcon={'hourglass'}
            rightIcon={'chevron-right'}
            style={{ marginTop: 50 }}
          />
        </View>

        <View className="pt-20 items-center w-full">
          <TouchableOpacity
            className="w-1/2 px-4 py-6 bg-white rounded-2xl shadow-lg flex items-center justify-center"
            onPress={handleCreateSession}
          >
            <Text className="text-black font-semibold text-lg">Create Session</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  exitButton: {
    position: 'absolute',
    top: 25,
    left: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 50,
    textAlign: 'center',
  },
  modal: {
    marginHorizontal: 0,
    width: SCREEN_WIDTH,
  },
  modalBackground: {
    backgroundColor: '#141414',
  },
  handleIndicator: {
    // the white thingy ontop
    backgroundColor: '#ffffff',
    width: 40,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    paddingBottom: 34,
  },

  optionContainer: {
    rowGap: 30,
    paddingTop: 75,
  },
});
