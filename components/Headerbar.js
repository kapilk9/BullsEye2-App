import {View, Text} from 'react-native';
import React from 'react';
import {COLORS, SIZES, FONTS} from '../constants';

const HeaderBar = ({title}) => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.radius,
      }}>
      <Text style={{color: COLORS.white, ...FONTS.largeTitle}}>{title}</Text>
    </View>
  );
};

export default HeaderBar;
