import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import SessionButtons from './SessionButtons';
import DurationModal from './DurationModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const CreateSessionModal = ({ bottomSheetModalRef }) => {
  const snapPoints = ['90%'];

  const durationModalRef = useRef(null);

  //using useState to keep track of the options
  const [duration, setDuration] = useState(null);
  const [mode, setMode] = useState(null);

  // visibility of the options modal
  const [isDurationModalVisible, setIsDurationModalVisible] = useState(false);
  const [isModeVisible, setIsModeVisible] = useState(false);

  //handle opening modal
  const handleOpenDuration = useCallback(() => {
    setIsDurationModalVisible(true);
  }, []);

  const handleCloseDuration = useCallback(() => {
    setIsDurationModalVisible(false);
  }, []);

  // MAIN MODAL

  // darkbackdrop behind the modal
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleClossPress = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  const handleCreateSession = () => {
    bottomSheetModalRef.current?.dismiss();
  };

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
        <TouchableOpacity
          style={styles.exitButton}
          onPress={handleCreateSession}
        >
          <Ionicons name="close" size={32} color="white" />
        </TouchableOpacity>
        <View style={styles.optionContainer}>
          <SessionButtons
            label="Duration"
            leftIcon={'hourglass'}
            rightIcon={'chevron-right'}
            altLabel={duration}
            onPress={handleOpenDuration}
          />
          {isDurationModalVisible && (
            <DurationModal
              durationSheetRef={durationModalRef}
              onClose={handleCloseDuration}
              onSelect={(duration) => {
                setDuration(duration);
                handleCloseDuration();
              }}
            />
          )}

          <SessionButtons
            label="Apps Blocked"
            leftIcon={'hourglass'}
            rightIcon={'chevron-right'}
            altLabel="Block List"
          />
          <SessionButtons
            label="Mode"
            leftIcon={'hourglass'}
            rightIcon={'chevron-right'}
            altLabel="Trust Mode"
          />
          <SessionButtons
            label="Schedule for later"
            leftIcon={'hourglass'}
            rightIcon={'chevron-right'}
            style={{ marginTop: 50 }}
          />
        </View>

        <View className="pt-20 items-center w-full">
          <Pressable
            className="w-1/2 px-4 py-6 bg-white rounded-2xl shadow-lg flex items-center justify-center"
            onPress={handleCreateSession}
          >
            <Text className="text-black font-semibold text-lg">
              Create Session
            </Text>
          </Pressable>
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
    marginBottom: 24,
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
    paddingTop: 100,
  },
});
