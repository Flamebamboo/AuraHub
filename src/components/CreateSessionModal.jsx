import React, { useState, useCallback } from 'react';
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const CreateSessionModal = ({ bottomSheetModalRef }) => {
  const [sessionName, setSessionName] = useState('');
  const [duration, setDuration] = useState('');

  const snapPoints = ['85%'];

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
    console.log('Creating session:', { sessionName, duration });
    bottomSheetModalRef.current?.dismiss();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
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
          />
          <SessionButtons
            label="Apps Blocked"
            leftIcon={'hourglass'}
            rightIcon={'chevron-right'}
          />
          <SessionButtons
            label="Mode"
            leftIcon={'hourglass'}
            rightIcon={'chevron-right'}
          />
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
  },
});
