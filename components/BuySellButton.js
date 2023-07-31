import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

import {COLORS, FONTS, SIZES} from '../constants';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"


const BuySellButton = ({label, icon, containerStyle, onPress,backgroundColor}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: responsiveWidth(13),
        width:responsiveWidth(40),
        borderRadius: responsiveWidth(2),
        backgroundColor: backgroundColor,
        ...containerStyle,
      }}
      onPress={onPress}>
      <Text style={{marginLeft:responsiveWidth(2), fontSize:  responsiveFontSize(2), color:COLORS.white}}>{label}</Text>
    </TouchableOpacity>
  );
};

export default BuySellButton;
