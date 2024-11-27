import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, { useRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import { StartFocus } from '../components/StartFocus';
import { Ionicons } from '@expo/vector-icons';

export const CreateSession = ({ bottomSheetRef }) => {
  const handleClossPress = ({ bottomSheetRef }) => {
    bottomSheetRef.current?.close();
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={['90%']}
        backgroundStyle={styles.bottomSheetBackground}
        enablePanDownToClose={true}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Pressable
            className="bg-slate-800 rounded-full p-2"
            style={styles.exitButton}
            onPress={handleClossPress}
          >
            <Ionicons name="close" size={24} color="white" />
          </Pressable>

          <Text className="font-ReadexPro font-medium text-2xl text-white flex-1 mt-3">
            Start <Text className="font-bold">Focus Session</Text>
          </Text>
          <View>
            <Text style={styles.textContent}>Hello</Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomSheetBackground: {
    backgroundColor: '#fff',
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textContent: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },

  exitButton: {
    position: 'absolute',
    top: 0,
    left: 30,
  },
});
