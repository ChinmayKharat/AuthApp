/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors from '../../const/colors';

const Button = ({title, onPress = () => {}}) => {
  return (
      <TouchableOpacity 
      activeOpacity={0.7}
      onPress={onPress} 
      style={{
        height:55,
        width:'100%',
        backgroundColor: Colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical:20,
      }}>
      <Text  style={{ color: Colors.white,fontSize:18,fontWeight:'bold' }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
