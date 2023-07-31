import React, { useRef,useCallback } from 'react';
import { GestureHandlerRootView, GestureDetector } from 'react-native-gesture-handler';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SearchBar from '../SearchBar';
import BottomSheet from '../BottomSheet';

import {
  setIsTradeModalVisible,
  selectIsTradeModalVisible,
} from '../redux/market/coinSlice';
import BuySellLayout from '../../screens/BuySellLayout';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const {height, width} = Dimensions.get('window');
const MyList = () => {
  const ref = useRef(null);
  const onPress = useCallback(() => {
    const isActive = ref.current?.isActive();
    if (isActive) {
      ref.current?.scrollTo(0);
    } else {
      ref.current?.scrollTo(-400);
    }
  }, []);

  const coinsData = useSelector(state => state.coin.data);
  const isTradeModalVisible = useSelector(selectIsTradeModalVisible);
  const dispatch = useDispatch();

  
  // const handleTradeButtonPress = () => {
  //   dispatch(setIsTradeModalVisible(!isTradeModalVisible));
  // };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={styles.conatiner}>
      <View>
        <SearchBar/>
        <TouchableOpacity onPress={onPress} style={{display:'flex',justifyContent:'center',alignContent:'center'}}>
          <View
            style={styles.stock}>
            <View>
              <Text style={{color:'#bebebe'}}>Agol</Text>
              <Text style={{color:'#bebebe'}}>BSE</Text>
            </View>
            <View>
              <Text style={{color:'#bebebe'}}>76.98</Text>
              <Text style={{color:'#bebebe'}}>0.00%</Text>
            </View>
          </View>
        </TouchableOpacity>
        
      </View>
    </View>
    <BottomSheet ref={ref}/>
    </GestureHandlerRootView>
  );
};

export default MyList;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  subContainer: {
    width: width,
    marginTop: height - 420,
    height: height,
    backgroundColor: '#C4C6C9',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,

    // paddingLeft: 20,
  },
  stock:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    width: '100%',
    height: '50%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderTopWidth:1,
    borderTopColor: '#bebebe',
    borderBottomColor: '#bebebe',
  },

  search: {
    display: 'flex',
    top: 10,
    position: 'absolute',
    justifyContent: 'center',

    width: '90%',
    height: '7%',
    backgroundColor: '#ffff',
    borderRadius: 5,
  },
});
