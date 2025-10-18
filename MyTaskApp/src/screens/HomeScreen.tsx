import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { HomeScreenProps } from '../types/types';
import { styles } from '../styles/styles';

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [name, setName] = useState('');

  const handleGetStarted = () => {
    if (name.trim() === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập tên của bạn');
    } else {
      navigation.navigate('TaskList', { userName: name });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>MANAGE YOUR</Text>
        <Text style={[styles.title, { color: '#8A2BE2', marginBottom: 60 }]}>TASK</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>GET STARTED →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
