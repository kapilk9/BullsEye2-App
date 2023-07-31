import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS } from '../constants';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"


const CustomButton = ({ label, onPress }) => (
  <TouchableOpacity
  onPress={() => onPress()}
    style={{
      backgroundColor: "blue",
      padding: responsiveWidth(3.5),
      borderRadius: responsiveWidth(2),
      marginBottom: responsiveHeight(2),
    }}>
    <Text
      style={{
        textAlign: 'center',
        fontWeight: '700',
        fontSize: responsiveFontSize(2.5),
        color: '#fff',
      }}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default CustomButton;
