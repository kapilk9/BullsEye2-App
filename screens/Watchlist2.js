import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  fetchCoinData,
  removeAllFromWatchlist,
  removeFromWatchlist,
  initWatchlistData
} from '../Src/redux/market/coinSlice';
import {COLORS} from '../constants';
import{ responsiveFontSize,responsiveHeight,responsiveWidth} from "react-native-responsive-dimensions"


const Watchlist2 = () => {
  const navigation = useNavigation();
  const watchlistData = useSelector(state => state.coin.watchlistData);
  console.log('watchlist', watchlistData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCoinData()).catch(error => {
      console.log('Error fetching coin data:', error);
    });
  }, []);


  useEffect(() => {
    dispatch(initWatchlistData()).catch(error=>{
        console.log('error fetching inititwatchlist data',error)
    })
  }, []);


  const handleRemoveAll = () => {
    dispatch(removeAllFromWatchlist());
  };

 


  const handleRemoveItem = (itemId) => {
    dispatch(removeFromWatchlist(itemId));
  };

  const navigationHandle = () => {
    navigation.navigate('SearchData');
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          width:responsiveWidth(100) ,
          height: responsiveWidth(20),
          backgroundColor: COLORS.bgColor,
          marginVertical: 1,
          justifyContent: 'center',
          paddingHorizontal: responsiveWidth(3),
        }}>
        <View style={styles.topMiddle}>
          <View>
            <Text style={styles.topText}>{item.trade_name}</Text>
          </View>
          <View style={styles.topLast}>
            <Text style={[styles.topText, {paddingRight: 60}]}>
              {item.price}
            </Text>
            <Text style={styles.topText}>{item.percent_chg}%</Text>
          </View>
          <TouchableOpacity
              style={{paddingLeft: 10}}
              onPress={()=>handleRemoveItem(item.id)}>
              <Icon4 name="delete-circle-outline" size={22} color="red" />
            </TouchableOpacity>
        </View>
        
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={styles.searchInputContainer}
          onPress={navigationHandle}>
          <Icon2 name="search" size={responsiveFontSize(2.5)} color="#fff" />
          <Text style={[styles.searchInput,{fontSize:responsiveFontSize(2.1)}]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.profileIconContainer}>
            <Icon3 name="user" size={responsiveFontSize(4)} color="#000" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.topContainer}>
        <View style={styles.topMiddle}>
          <View>
            <Text style={styles.topText1}>Stock Name</Text>
          </View>
          <View style={styles.topLast}>
            <Text style={[styles.topText1,]}>Price</Text>
            <Text style={styles.topText1}>Change / Vol</Text>
          </View>
          <View style={styles.topLast}>
            
          </View>
          
        </View>
      </View>

      {watchlistData && watchlistData.length > 0 ? (
        <FlatList
          data={watchlistData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <View style={styles.noItemsContainer}>
          <Text style={{color:'#000',fontSize:responsiveFontSize(2.5)}}>No items in watchlist</Text>
        </View>
      )}
   
      <TouchableOpacity style={styles.addBox} onPress={navigationHandle}>
        <Icon name="plus" size={responsiveFontSize(2.5)} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Watchlist2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.mainBgColor
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: responsiveHeight(2),
    marginHorizontal:responsiveWidth(5)
  },
  searchInputContainer: {
    width: responsiveWidth(55),
    height: responsiveWidth(10),
    backgroundColor: COLORS.bgColor,
    borderRadius: responsiveWidth(1),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: responsiveWidth(3),
  },
  addBox: {
    position: 'absolute',
    bottom: responsiveHeight(5),
    right: responsiveWidth(5),
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    backgroundColor: '#1A6164',
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    paddingLeft: responsiveWidth(3),
    color: COLORS.white,
  },
  profileIconContainer: {
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: responsiveWidth(5),
    backgroundColor: COLORS.bgColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topMiddle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topText: {
    color: COLORS.textColor,
    fontSize: 12,
    fontWeight: '400',
  },
  topLast: {
    flexDirection: 'row',
    gap: 5,
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  topContainer: {
    width: responsiveWidth(100),
    height: responsiveWidth(10),
    backgroundColor: '#eeaeca',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: responsiveWidth(5),
  },
  topMiddle: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topLast: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  topText1: {
    color: COLORS.textColor,
    fontSize: responsiveWidth(3.5),
    fontWeight: '500',
    paddingRight: responsiveWidth(5),
  },
  topText: {
    color: COLORS.textColor,
    fontSize: 12,
    fontWeight: '500',
  },
});
