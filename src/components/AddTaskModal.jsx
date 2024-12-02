import React, { useState } from 'react';
import { Modal, View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const AddTaskModal = ({ visible, onClose, onAdd, labels }) => {
  const [taskName, setTaskName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const trimmingTask = taskName.trim();
    if (trimmingTask.length === 0) {
      setError('Task name cannot be empty');
      return;
    }

    if (labels.some((label) => label.toLowerCase() === trimmingTask.toLowerCase())) {
      setError('Task already exists');
      return;
    }

    onAdd(trimmingTask);
    setTaskName('');
    setError('');
    onClose();
  };

  const handleInputChange = (text) => {
    setTaskName(text);
    setError('');
  };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Task</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter task name"
            placeholderTextColor="#666666"
            value={taskName}
            onChangeText={handleInputChange}
            autoFocus
          />
          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.addButton]} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddTaskModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(148, 130, 218, 0.5)', // Matching your backdrop color with opacity
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    height: '45%',
    backgroundColor: '#141414', // Matching your modal background
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#2C2C2C', // Matching your item container color
    borderRadius: 12,
    padding: 15,
    color: '#ffffff',
    marginBottom: 20,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#3D3D3D',
  },
  addButton: {
    backgroundColor: '#9482DA', // Matching your theme color
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
