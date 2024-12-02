import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Button, TextInput, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { BottomSheetModal, BottomSheetFlatList, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import CustomBackdrop from './CustomBackdrop';
import { FontAwesome } from '@expo/vector-icons';
import AddTaskModal from './AddTaskModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskSelector = ({ taskSelectorRef, onClose }) => {
  const STORAGE_KEY = '@tasks_key'; //key for async storage
  const snapPoints = ['70%'];
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const [labels, setLabels] = useState([]);

  // Load tasks when component mounts
  useEffect(() => {
    loadTasks();
  }, []);

  {
    /*
    AsyncStorage notes:


    - It only store string data
    - To do this we can serialized to JSON
    - JSON.stringify() when saving the data
    -JSON.parse() when loading the data 

    

    Storing Data - setItem() method is used to add new data item 
    (when no data for given key exist), and to modify existing item 
    (when previous data for given key exist)


    Reading Data - getItem() returns a promise that either resolves to 
    stored value when data is found for given key, or returns null otherwise.
    
    Its asynchronous (needs async/await)
    Always use try/catch because reading from storage can fail
    
    psuedo code:

    1) load task get the existing saved task, convert string back to array/object and add to labels
    call this when the component renders

    2) check if saved task does not exist then we render default task, 
    save the default task into the storage, make sure to covert to string first then add into the label with setLabel

    3) save task functionality  rmmbr to use await when setItem, add the new task to the storage 

    4) delete task 
    
    */
  }
  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem(STORAGE_KEY); //here we try to find our saved task
      if (savedTasks !== null) {
        // here if the saved task exist
        setLabels(JSON.parse(savedTasks)); //we convert the string back to object/array
      } else {
        const defaultTasks = ['Study', 'Coding', 'Exercise', 'Reading', 'Meditation', 'Work', 'Break'];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTasks));
        setLabels(defaultTasks);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Save tasks to AsyncStorage
  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks)); //setItems need 2 param takes where to save in this case the storage key, we cant save array directly so we convert to string by using JSON.stringify()
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddNewTask = async (taskName) => {
    const newTasks = [taskName, ...labels];
    setLabels(newTasks);
    await saveTasks(newTasks); // Save to AsyncStorage
  };

  const handleDeleteTask = async (taskToDelete) => {
    const newTasks = labels.filter((task) => task !== taskToDelete);
    setLabels(newTasks);
    await saveTasks(newTasks);
  };

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
