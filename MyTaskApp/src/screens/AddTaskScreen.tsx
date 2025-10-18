import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { AddTaskScreenProps } from '../types/types';
import { styles } from '../styles/styles';

export default function AddTaskScreen({ route, navigation }: AddTaskScreenProps) {
  const [taskText, setTaskText] = useState('');
  const { onAddTask } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'ADD YOUR JOB',
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: '#f7f7f7' },
      headerShadowVisible: false,
    });
  }, [navigation]);

  const handleFinish = () => {
    if (taskText.trim() === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập tên công việc');
      return;
    }
    onAddTask(taskText);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { paddingTop: 20 }]}>
      <TextInput
        style={[styles.input, { borderColor: '#8A2BE2' }]}
        placeholder="Input your job"
        value={taskText}
        onChangeText={setTaskText}
      />
      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.buttonText}>FINISH →</Text>
      </TouchableOpacity>
       
    </View>
  );
}
