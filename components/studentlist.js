import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Studentlist = (props) => {
  const [isChecked, setIsChecked] = useState(props.isChecked);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.container}>
      {/* Student name */}
      <Text style={styles.title}>{props.name}</Text>

      {/* Payment due */}
      <Pressable style={styles.money}>
        <MaterialIcons name="money-off" size={24} color="black" />
      </Pressable>

      {/* Check button */}
      <Pressable onPress={handleCheck}>
        <AntDesign name={isChecked ? 'checksquare' : 'checksquareo'} size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default Studentlist;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold', // Fixed fontWeight
  },
  money: {
    padding: 5,
    borderRadius: 5,
    marginRight: 50,
  },
});
