import React from 'react';
import {View} from 'react-native';
import {colors, shadow} from '../constants/theme';
// import Icon from './Icon';

const FavoriteButton = ({active, style}) => {
  return (
    <View
      style={[
        {
          backgroundColor: "#fffff",
          padding: 4,
          borderRadius: 20,
        },
   
        style,
      ]}>
      {/* <Icon icon={active ? 'FavoriteFilled' : 'Favorite'} size={24} /> */}
    </View>
  );
};

export default FavoriteButton;