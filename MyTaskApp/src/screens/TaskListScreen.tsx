import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Task } from '../types/types';
import { styles } from '../styles/styles';
import TaskItem from '../components/TaskItem';

// Dữ liệu công việc ban đầu
const INITIAL_TASKS: Task[] = [
  { id: '1', text: 'To check email', completed: true },
  { id: '2', text: 'UI task web page', completed: false },
  { id: '3', text: 'Learn javascript basic', completed: false },
  { id: '4', text: 'Learn HTML Advance', completed: false },
  { id: '5', text: 'Medical App UI', completed: false },
  { id: '6', text: 'Learn Java', completed: false },
];

// Định nghĩa kiểu props cho màn hình này
type TaskListScreenProps = NativeStackScreenProps<RootStackParamList, 'TaskList'>;

export default function TaskListScreen({ route, navigation }: TaskListScreenProps) {
  const { userName } = route.params;
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [searchQuery, setSearchQuery] = useState('');

  // Tùy chỉnh header của màn hình
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <Image
            source={require('../images/man.png')}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.headerTitle}>Hi {userName}</Text>
            <Text style={styles.headerSubtitle}>Have a great day ahead</Text>
          </View>
        </View>
      ),
      headerStyle: {
        backgroundColor: '#f7f7f7',
      },
      headerShadowVisible: false,
      headerBackVisible: true,
    });
  }, [navigation, userName]);

  // Hàm được gọi khi thêm công việc mới từ màn hình AddTask
  const handleAddTask = (taskText: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text: taskText,
      completed: false,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  // Hàm được gọi khi cập nhật công việc từ màn hình EditTask
  const handleEditTask = (taskId: string, newText: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, text: newText } : task
      )
    );
  };

  // Hàm xử lý việc đánh dấu hoàn thành công việc
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Hàm xử lý việc xóa công việc
  const deleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  // Lọc danh sách công việc dựa trên ô tìm kiếm
  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Ô tìm kiếm */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {/* Danh sách công việc */}
      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskItem
            item={item}
            onToggle={toggleTaskCompletion}
            onDelete={deleteTask}
            // Khi nhấn nút sửa, điều hướng đến màn hình EditTask
            onEdit={(id, text) =>
              navigation.navigate('EditTask', {
                taskId: id,
                currentText: text,
                onEditTask: handleEditTask, // Truyền hàm xử lý cập nhật
              })
            }
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
      {/* Nút thêm mới công việc */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTask', { onAddTask: handleAddTask })}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

