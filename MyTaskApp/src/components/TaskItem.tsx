import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../types/types';
import { styles } from '../styles/styles';

// Định nghĩa các props mà component này sẽ nhận
interface TaskItemProps {
  item: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void; // Prop cho chức năng sửa
}

const TaskItem: React.FC<TaskItemProps> = ({ item, onToggle, onDelete, onEdit }) => {
  return (
    <View style={styles.taskItem}>
      {/* Nút checkbox để đánh dấu hoàn thành */}
      <TouchableOpacity onPress={() => onToggle(item.id)} style={styles.taskCheckbox}>
        {item.completed && <View style={styles.taskCheckboxChecked} />}
      </TouchableOpacity>

      {/* Tên công việc */}
      <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
        {item.text}
      </Text>

      {/* Nút Sửa */}
      <TouchableOpacity 
        style={styles.taskButtonEdit} 
        // Gọi hàm onEdit đã được truyền vào khi nhấn
        onPress={() => onEdit(item.id, item.text)}
      >
        <Text>✏️</Text>
      </TouchableOpacity>

      {/* Nút Xóa */}
      <TouchableOpacity style={styles.taskButtonDelete} onPress={() => onDelete(item.id)}>
        <Text>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskItem;

