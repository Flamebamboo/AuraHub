import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Button, TextInput, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { BottomSheetModal, BottomSheetFlatList, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import CustomBackdrop from './CustomBackdrop';
import { FontAwesome } from '@expo/vector-icons';
import AddTaskModal from './AddTaskModal';

const TaskSelector = ({ taskSelectorRef, onClose }) => {
  const snapPoints = ['70%'];
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  const handleSheetChanges = useCallback(
    (index) => {
      if (index === -1) {
        onClose?.();
      }
    },
    [onClose]
  );

  // Sample data for the list
  //useMemo is to avoid rerenders?
  const [labels, setLabels] = useState(['Study', 'Coding', 'Exercise', 'Reading', 'Meditation', 'Work', 'Break']);

  const handleAddNewTask = (taskName) => {
    setLabels((prevLabels) => [taskName, ...prevLabels]);
  };

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          // Handle task selection here
          onClose?.();
        }}
      >
        <Text style={styles.itemText}>{item}</Text>
      </TouchableOpacity>
    ),
    [onClose]
  );

  useEffect(() => {
    taskSelectorRef.current?.present();
  }, []);

  return (
    <BottomSheetModal
      ref={taskSelectorRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enableContentPanningGesture={false}
      enablePanDownToClose={true}
      backgroundStyle={styles.modalBackground}
      handleIndicatorStyle={styles.handleIndicator}
      backdropComponent={(props) => <CustomBackdrop {...props} backgroundColor="#9482DA" opacity={1} />}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Select Task</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => setIsAddModalVisible(true)}>
            <FontAwesome name="plus" size={32} color="white" />
          </TouchableOpacity>
        </View>
        <AddTaskModal
          visible={isAddModalVisible}
          onClose={() => setIsAddModalVisible(false)}
          onAdd={handleAddNewTask}
          labels={labels}
        />
        <BottomSheetFlatList
          data={labels}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  addNewButton: {
    backgroundColor: '#9482DA',
    padding: 12,
    borderRadius: 12,
    marginVertical: 10,
  },
  modalBackground: {
    backgroundColor: '#141414',
  },
  handleIndicator: {
    backgroundColor: '#ffffff',
    width: 40,
  },

  addButton: {},

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },

  exitButton: {
    position: 'absolute',
    top: 24,
    left: 24,
  },
  listContent: {
    paddingTop: 20,
  },
  itemContainer: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#2C2C2C',
    borderRadius: 12,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#ffffff',
  },
  itemText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
TaskSelector.propTypes = {
  taskSelectorRef: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

export default TaskSelector;
