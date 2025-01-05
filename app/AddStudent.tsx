import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { app, db, collection, addDoc } from '../firebase/index';

// Define the type for the student form
interface StudentForm {
  name: string;
  age: string;
  class: string;
  school: string;
  address: string;
  phone: string;
}

const AddStudent: React.FC = () => {
  // Initialize form state with proper type
  const [form, setForm] = useState<StudentForm>({
    name: '',
    age: '',
    class: '',
    school: '',
    address: '',
    phone: '',
  });

  // Update the form state dynamically
  const handleChange = (field: keyof StudentForm, value: string) => {
    setForm({ ...form, [field]: value });
  };

  // Function to add a new student
  const addStudent = async () => {
    const { name, age, class: studentClass, school, address, phone } = form;

    // Validate all fields are filled
    if (!name || !age || !studentClass || !school || !address || !phone) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'student'), {
        name,
        age,
        class: studentClass,
        school,
        address,
        phone,
      });
      console.log('Document written with ID: ', docRef.id);
      Alert.alert('Success', 'Student added successfully.');

      // Reset the form
      setForm({
        name: '',
        age: '',
        class: '',
        school: '',
        address: '',
        phone: '',
      });
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('Error', 'Failed to add student. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Link href={'/'}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </Link>
      <Text style={styles.title}>Add Student</Text>

      <View style={styles.form}>
        {/* Input Fields */}
        <Text>Student Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Student Name"
          value={form.name}
          onChangeText={(value) => handleChange('name', value)}
        />

        <Text>Student Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Student Age"
          value={form.age}
          onChangeText={(value) => handleChange('age', value)}
          keyboardType="numeric"
        />

        <Text>Class</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Student Class"
          value={form.class}
          onChangeText={(value) => handleChange('class', value)}
        />

        <Text>School</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Student School"
          value={form.school}
          onChangeText={(value) => handleChange('school', value)}
        />

        <Text>Student Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Student Address"
          value={form.address}
          onChangeText={(value) => handleChange('address', value)}
        />

        <Text>Student Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Student Phone"
          value={form.phone}
          onChangeText={(value) => handleChange('phone', value)}
          keyboardType="phone-pad"
        />

        {/* Add Student Button */}
        <TouchableOpacity onPress={addStudent} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Student</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddStudent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    alignSelf: 'center',
  },
  form: {
    marginVertical: 20,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
