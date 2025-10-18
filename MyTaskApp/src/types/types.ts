import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Kiểu dữ liệu cho một công việc
export type Task = {
  id: string;
  text: string;
  completed: boolean;
};

// Định nghĩa các tham số cho các màn hình trong Stack Navigator
export type RootStackParamList = {
  Home: undefined;
  TaskList: { userName: string };
  AddTask: { onAddTask: (taskText: string) => void };
  // Thêm định nghĩa cho màn hình EditTask
  EditTask: {
    taskId: string;
    currentText: string;
    onEditTask: (taskId: string, newText: string) => void;
  };
};

// Props cho từng màn hình
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type TaskListScreenProps = NativeStackScreenProps<RootStackParamList, 'TaskList'>;
export type AddTaskScreenProps = NativeStackScreenProps<RootStackParamList, 'AddTask'>;
// Thêm props cho màn hình EditTask
export type EditTaskScreenProps = NativeStackScreenProps<RootStackParamList, 'EditTask'>;

