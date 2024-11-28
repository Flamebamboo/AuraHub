import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

const DurationModal = ({ durationSheetRef, onClose, onSelect }) => {
  const snapPoints = ['50%'];

  const handleSheetChanges = useCallback(
    (index) => {
      if (index === -1) {
        // Modal was closed
        onClose?.();
      }
    },
    [onClose]
  );

  // Use useEffect to present the modal when component mounts
  useEffect(() => {
    durationSheetRef.current?.present();
  }, []);

  return (
    <BottomSheetModal
      ref={durationSheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text>Awesome 🎉</Text>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
});

export default DurationModal;
