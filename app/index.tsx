import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Studentlist from '../components/studentlist';
import { app, db, collection, getDocs, addDoc } from '../firebase/index';

// Define the type for a student
type Student = {
  id: string;
  name: string;
  isChecked: boolean;
};

// Define the type for an attendance entry
type Attendance = {
  studentId: string;
  name: string;
  date: string;
  attendance: boolean;
};

export default function Index() {
  const navigation = useNavigation();

  const [studentlist, setStudentList] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString(); // Format today's date

  const getStudentList = async () => {
    const querySnapshot = await getDocs(collection(db, 'student'));
    let students: Student[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      students.push({
        ...data,
        id: doc.id,
        isChecked: false, // Default to not checked
      } as Student);
    });
    setStudentList(students);
    setLoading(false);
  };

  const saveAttendance = async () => {
    try {
      for (const student of studentlist) {
        await addDoc(collection(db, 'AttendanceSheet'), {
          studentId: student.id,
          name: student.name,
          date: today,
          attendance: student.isChecked,
        } as Attendance);
      }
      alert('Attendance saved successfully!');
    } catch (error) {
      console.error('Error saving attendance:', error);
      alert('Failed to save attendance.');
    }
  };

  useEffect(() => {
    getStudentList();
  }, []);

  const toggleAttendance = (id: string) => {
    setStudentList((prevList) =>
      prevList.map((student) =>
        student.id === id ? { ...student, isChecked: !student.isChecked } : student
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Attendance</Text>
        <Text style={styles.date}>{today}</Text> {/* Display today's date */}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={studentlist}
          renderItem={({ item }) => (
            <Studentlist
              name={item.name}
              isChecked={item.isChecked}
              id={item.id}
              toggleAttendance={() => toggleAttendance(item.id)} // Pass toggleAttendance function
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <Link href='/AddStudent' asChild style={styles.addButton}>
        <TouchableOpacity>
          <FontAwesome name="plus" size={20} color="white" />
        </TouchableOpacity>
      </Link>

      <TouchableOpacity style={styles.saveButton} onPress={saveAttendance}>
        <Text style={styles.saveButtonText}>Save Attendance</Text>
      </TouchableOpacity>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    margin: 10,
  },
  heading: {
    fontSize: 30,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    width: '90%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    width: 40,
    height: 40,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
