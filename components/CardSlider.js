import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCoinData} from '../Src/redux/market/coinSlice';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES, sizes, spacing,FONTS} from '../constants/theme';
import FavoriteButton from './FavoriteButton';
import LinearGradient from 'react-native-linear-gradient';
import { icons } from '../constants';
const CARD_WIDTH = sizes.width;
const CARD_HEIGHT = 200;
const CardSlider = ({sizes, spacing, large}) => {

  const [data,setdata]=useState([1,1,1,1,]);

  const dispatch = useDispatch();
  const coinsData = useSelector(state => state.coin.data);
  useEffect(() => {
    dispatch(fetchCoinData());
  }, []);
 
  return (
    <View>
      <FlatList
        data={coinsData}
        horizontal
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          let priceColor =
          item.price_change_percentage_7d_in_currency == 0
            ? COLORS.lightGray3
            : item.price_change_percentage_7d_in_currency > 0
            ? COLORS.lightGreen
            : COLORS.red;
          return (
            <TouchableOpacity
              style={{
                marginLeft: 10,
                marginRight: index === coinsData.length - 1 ? 10 : 0,
              }}>
              <View style={[styles.card]}>
              {/* <LinearGradient
                // colors={['#0047AB', '#0047AB', '#A7C7E7']}
                colors={['#020024', '#090979', '#00d4ff']}
              
                style={styles.card}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}> */}
                {/* <FavoriteButton style={styles.favorite} /> */}
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 10,
                    }}>
                    <View style={styles.circle}>
                      <Image
                        source={{uri: item.image}}
                        style={{width: 15, height: 15}}
                      />
                    </View>
                  </View>

                  <View>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.title2}>{item.symbol ? item.symbol.toUpperCase() : ''}</Text>
                  </View>
                </View>
                <View>
         

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              paddingLeft:20,
              marginTop:5
            }}>
          
            {item.price_change_percentage_7d_in_currency != 0 && (
              <Image
                source={icons.upArrow}
                style={{
                  height: 10,
                  width: 10,
                  tintColor: priceColor,
                  transform:
                    item.price_change_percentage_7d_in_currency > 0
                      ? [{rotate: '45deg'}]
                      : [{rotate: '125deg'}],
                }}
              />
            )}
            <Text
              style={{
                marginLeft: 5,
                color: priceColor,
                ...FONTS.body5,
                lineHeight: 15,
              }}>
              {item.price_change_percentage_7d_in_currency.toFixed(2)} %
            </Text>
            <Text style={{textAlign: 'right', color: COLORS.white, ...FONTS.h4,marginVertical:5}}>
            $ {item.current_price}
          </Text>
          </View>
        </View>

                <View>


                </View>
                </View>
              {/* </LinearGradient> */}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CardSlider;

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 120,
    marginVertical: 10,
    backgroundColor: '#0047AB',
    borderRadius: 20,
  },
  circle: {
    width: 30,
    height: 30,
    backgroundColor: '#A7C7E7',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favorite: {
    position: 'absolute',
    top: spacing.m,
    right: spacing.m,
    zIndex: 1,
  },
  imageBox: {
    width: 20,
    height: 20,
    borderRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH - 200,
    height: CARD_HEIGHT - 200,
    resizeMode: 'contain',
  },
  title: {
    color:COLORS.white,
    fontSize:SIZES.h4,
    fontWeight:'700'
  },
  title2:{
    color:COLORS.white,
    fontSize:SIZES.h5,
    fontWeight:'400'
  }
});
