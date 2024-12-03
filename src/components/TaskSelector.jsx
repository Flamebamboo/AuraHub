import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Button, TextInput, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { BottomSheetModal, BottomSheetFlatList, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import CustomBackdrop from './CustomBackdrop';

import { BlurView } from '@react-native-community/blur';
import AddTaskModal from './AddTaskModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';

//temp custom import icon
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { CustomSvg } from './CustomSvg';

const TaskSelector = ({ taskSelectorRef, onClose, selectedTask, displayColor }) => {
  const STORAGE_KEY = '@tasks_key'; //key for async storage
  const snapPoints = ['70%'];
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // const deleteTaskKeyStorage = async () => {
  //   try {
  //     await AsyncStorage.removeItem('@tasks_key');
  //     console.log('Storage deleted successfully');
  //   } catch (error) {
  //     console.error('Error deleting storage:', error);
  //   }
  // };

  // // Call the function to delete the storage
  // deleteTaskKeyStorage();

  // const [selectedTask, setSelectedTask] = useState(null);
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
        const defaultTasks = [
          { name: 'Study', color: '#7C3FFF' },
          { name: 'Coding', color: '#FF5452' },
          { name: 'Exercise', color: '#3FFFA9' },
          { name: 'Reading', color: '#FFDF3F' },
        ];
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

  const [selectedTaskName, setSelectedTaskName] = useState(null);

  const renderItem = useCallback(
    ({ item }) => {
      const isChecked = selectedTaskName === item.name;

      const toggleCheckbox = () => {
        setSelectedTaskName((prevSelectedTaskName) => (prevSelectedTaskName === item.name ? null : item.name));
        selectedTask(item.name);
        displayColor(item.color);
      };

      return (
        <TouchableOpacity style={styles.itemContainer} onPress={toggleCheckbox}>
          <View className="flex-row px-2 justify-between items-center">
            <View className="flex-row items-center gap-5">
              <FontAwesomeIcon icon={faTag} size={26} color={item.color} />
              <Text className="text-white text-xl font-semibold">{item.name}</Text>
            </View>

            <View>
              <BouncyCheckbox
                isChecked={isChecked}
                disableText
                size={25}
                fillColor="white"
                useBuiltInState={false}
                unFillColor="transparent"
                innerIconStyle={{ borderWidth: 2, borderColor: 'white' }}
                onPress={toggleCheckbox}
              />
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [selectedTaskName, onClose]
  );

  useEffect(() => {
    taskSelectorRef.current?.present();
  }, []);

  return (
    <BottomSheetModal
      ref={taskSelectorRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enableContentPanningGesture={false}
      enablePanDownToClose={true}
      backgroundStyle={styles.modalBackground}
      handleIndicatorStyle={styles.handleIndicator}
      backdropComponent={(props) => <CustomBackdrop {...props} backgroundColor="#9482DA" opacity={1} />}
    >
      {!editMode ? (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Select Task</Text>
            <View className="flex-row gap-6">
              <TouchableOpacity onPress={() => setIsAddModalVisible(true)}>
                <FontAwesomeIcon icon={faPlusSquare} size={28} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEditMode(true)}>
                <FontAwesomeIcon icon={faPenToSquare} size={26} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <AddTaskModal
            visible={isAddModalVisible}
            onClose={() => setIsAddModalVisible(false)}
            onAdd={handleAddNewTask}
            labels={labels}
          />
          <BottomSheetFlatList
            data={labels} //data to be rendered in this case task data
            keyExtractor={(item) => item.name}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />

          {selectedTaskName && (
            <Animated.View entering={FadeInDown} exiting={FadeOut}>
              <View className="absolute bottom-0 left-0 right-0 -mx-6">
                <BlurView blurType="dark" blurAmount={50} reducedTransparencyFallbackColor="black">
                  <View className="pb-8 items-center justify-center ">
                    <TouchableOpacity
                      className="w-1/2 px-4 py-6 bg-white rounded-2xl shadow-lg flex items-center justify-center"
                      onPress={onClose}
                    >
                      <Text className="text-black font-semibold text-lg">Done</Text>
                    </TouchableOpacity>
                  </View>
                </BlurView>
              </View>
            </Animated.View>
          )}
        </View>
      ) : (
        <View style={styles.container}>
          <Text className="text-white">
            same thing but modified for edit like rearrage, delete task, edit/rename task
          </Text>
          <View className="flex-1 items-end flex-row justify-center mb-9 border-2 border-white">
            <TouchableOpacity
              className="w-1/2 px-4 py-6 bg-white rounded-2xl shadow-lg flex items-center justify-center"
              onPress={() => setEditMode(false)}
            >
              <Text className="text-black font-semibold text-lg">Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end', // Aligns content to bottom
    paddingBottom: 32, // Adds some padding at the bottom
  },
  animatedContainer: {
    width: '100%',
    alignItems: 'center',
  },
});

const editStyles = StyleSheet.create({});

TaskSelector.propTypes = {
  taskSelectorRef: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

export default TaskSelector;
