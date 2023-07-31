import {View, Text, Image} from 'react-native';
import React from 'react';
import {SIZES, COLORS, FONTS, icons} from '../constants';
import IconTextButton from './IconTextButton';

const BalanceInfo = ({title, displayAmount, changePer, containerStyle}) => {
  return (
    <View style={{...containerStyle}}>
      {/* titleSection */}
      <Text style={{...FONTS.h3, color: COLORS.lightGray3}}>{title}</Text>

      {/* Figures */}
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        <Text style={{...FONTS.h3, color: COLORS.lightGray3}}>$</Text>
        <Text
          style={{marginLeft: SIZES.base, ...FONTS.h2, color: COLORS.white}}>
          {displayAmount}
        </Text>
        <Text style={{...FONTS.h3, color: COLORS.lightGray3}}>USD</Text>
      </View>

      {/* changePer */}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          paddingVertical:5
        }}>
        {changePer !== 0 && (
          <Image
            source={icons.upArrow}
            style={{
              width: 10,
              height: 10,
              alignSelf: 'center',
              tintColor: changePer > 0 ? COLORS.lightGreen : COLORS.red,
              transform:
                changePer > 0 ? [{rotate: '45deg'}] : [{rotate: '125deg'}],
            }}
          />
        )}

        <Text
          style={{
            marginLeft: SIZES.base,
            alignSelf: 'flex-end',
            color:
              changePer == 0
                ? COLORS.lightGray3
                : changePer > 0
                ? COLORS.lightGreen
                : COLORS.red,
            ...FONTS.h4,
          }}>
          {changePer}%
        </Text>

        <Text
          style={{
            marginLeft: SIZES.radius,
            alignSelf: 'flex-end',
            color: COLORS.lightGray3,
            ...FONTS.h5,
          }}>
          7d change
        </Text>
      </View>

      {/* Button */}
     
    </View>
  );
};

export default BalanceInfo;
