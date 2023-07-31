import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchCoinData, setIsTradeModalVisible, selectIsTradeModalVisible } from '../Src/redux/market/coinSlice';
import { responsiveHeight,responsiveWidth,responsiveFontSize } from 'react-native-responsive-dimensions';
import MainLayout from './MainLayout';
import { COLORS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width,height}=Dimensions.get("window")

const renderItem = ({ item, onPress }) => {
  const handleItemPress = () => {
    onPress(item);
  };

  return (
    <TouchableOpacity style={[styles.container, styles.searchCommodityBox]} onPress={handleItemPress}>
      <View
        style={[
          styles.sideLine,
          {
            backgroundColor: item.percent_chg < 1 ? 'red' : 'green',
          },
        ]}
      ></View>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
        <Text style={{ color: COLORS.textColor, fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>{item.trade_name}</Text>
        <Text style={{ color: COLORS.textColor, fontSize: responsiveFontSize(1.5) }}>{item.expiry_date}</Text>
        <Text style={{ color: COLORS.textColor, fontSize: responsiveFontSize(1.4), fontWeight: '500' }}>{item.price}</Text>
        <Text style={{ color: item.percent_chg < 1 ? 'red' : 'green', fontSize: responsiveFontSize(1.4) }}>{item.percent_chg}%</Text>
      </View>
    </TouchableOpacity>
  );
};

const Home = () => {
  const navigation = useNavigation();
  const isTradeModalVisible = useSelector(selectIsTradeModalVisible);
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);

  const coinsData = useSelector((state) => state.coin.data);




  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchCoinData());
    }, 1000); // 1000 milliseconds = 1 second

    return () => clearInterval(interval); // Cleanup function to clear the interval on unmount
  }, []);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    dispatch(setIsTradeModalVisible(true));
  };

  return (
    <MainLayout selectedItem={selectedItem}>
      {/* <ScrollView style={{ flex: 1, color: COLORS.mainBgColor }}> */}
        <View
          style={[
            styles.searchEluation,
            {
              paddingVertical: 15,
              backgroundColor: COLORS.bgColor,
            },
          ]}
        >
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10 }}>
            <Text style={{ color: COLORS.textColor, fontWeight: '600', fontSize: responsiveFontSize(2) }}>Trade on Commodity</Text>
          </View>
        </View>
        <View style={{ marginTop: 15,alignSelf:'center',display:'flex',justifyContent:'center' }}>
          <FlatList
            data={coinsData}
            renderItem={({ item }) => renderItem({ item, onPress: handleItemPress })}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
          />
        </View>
      {/* </ScrollView> */}
    </MainLayout>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 7,
    backgroundColor: COLORS.bgColor,
    width: responsiveWidth(45),
    height: responsiveHeight(12),
    borderRadius: 5,
    marginBottom: 10,
  },
  sideLine: {
    width: responsiveWidth(0.7),
    height: responsiveWidth(10),
    position: 'absolute',
    left: 0,
    borderRadius: 10,
  },
  searchEluation: {
    borderBottomWidth: 0.1,
    shadowColor: '#b3b3b3',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  searchCommodityBox: {
    borderBottomWidth: 0.1,
    shadowColor: COLORS.textColor,
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.84,
    elevation: 5,
  },
});
