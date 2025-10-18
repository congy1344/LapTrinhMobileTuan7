import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { styles } from '../styles/styles';

type EditTaskScreenProps = NativeStackScreenProps<RootStackParamList, 'EditTask'>;

export default function EditTaskScreen({ route, navigation }: EditTaskScreenProps) {
  const { taskId, currentText, onEditTask } = route.params;
  const [taskText, setTaskText] = useState(currentText);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerBackTitle: 'Back',
    });
  }, [navigation]);

  const handleSave = () => {
    if (taskText.trim()) {
      onEditTask(taskId, taskText.trim()); // Gọi hàm cập nhật được truyền từ TaskListScreen
      navigation.goBack(); // Quay lại màn hình danh sách
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EDIT YOUR JOB</Text>
      <TextInput
        style={styles.input}
        placeholder="input your job"
        value={taskText}
        onChangeText={setTaskText}
        autoFocus={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>FINISH →</Text>
      </TouchableOpacity>
      <Image
        source={{ uri: 'https://i.imgur.com/2YyYmAC.png' }}
        style={styles.bottomImage}
      />
    </View>
  );
}

