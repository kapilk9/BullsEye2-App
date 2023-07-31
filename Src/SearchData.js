import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import Icon5 from 'react-native-vector-icons/FontAwesome';
import Icon6 from 'react-native-vector-icons/AntDesign';

import {COLORS} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchCoinData, addToWatchlist} from '../Src/redux/market/coinSlice';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const SearchData = () => {
  // const dispatch = useDispatch();
  const addedItems = useSelector(state => state);
  // console.log(addedItems);
  const addItem = item => {
    dispatch(addCardItem(item));
  };
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const searchRef = useRef();
  const coinsData = useSelector(state => state.coin.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCoinData());
  }, []);

  const handleAddToWatchlist = item => {
    dispatch(addToWatchlist(item));

    navigation.navigate('MainLayout');
  };

  const navigation = useNavigation();
  const [filterData, setFilterData] = useState([]);
  const onSearch = text => {
    if (text == '') {
      setFilterData(coinsData);
    } else {
      let tempList = coinsData.filter(item => {
        return item.trade_name.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setFilterData(tempList);
    }
  };

  const watchlistData = useSelector(state => state.coin.watchlistData);

  const renderItem = ({item}) => {
    const isAddedToWatchlist = watchlistData.some(
      watchlistItem => watchlistItem.id === item.id,
    );
 
    return (
      <TouchableOpacity
        style={{
          width: responsiveWidth(100),
          height: responsiveWidth(18),
          backgroundColor: COLORS.bgColor,
          marginVertical: responsiveHeight(0.2),
          justifyContent: 'center',
          paddingHorizontal: responsiveWidth(5),
        }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: responsiveWidth(10),
                height: responsiveWidth(10),
                backgroundColor: COLORS.BottomTab,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: responsiveWidth(1),
                marginRight: responsiveWidth(3),
              }}>
              <Text style={{color: COLORS.white,fontSize:responsiveFontSize(2)}}>
                {item.trade_name.charAt(0)}
              </Text>
            </View>
            <Text
              style={{
                color: COLORS.textColor,
                fontSize: responsiveFontSize(1.8),
                fontWeight: '400',
              }}>
              {item.trade_name}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 5,
            }}>
            <Text
              style={{
                paddingRight: responsiveWidth(10),
                color: COLORS.textColor,
                fontSize: responsiveFontSize(1.8),
                fontWeight: '400',
              }}>
              {item.price}
            </Text>
            <TouchableOpacity>
              <Icon5 name="shopping-bag" size={responsiveFontSize(2.6)} color="#1B1A1A" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{paddingLeft: responsiveWidth(5)}}
              onPress={() => handleAddToWatchlist(item)}>
              {isAddedToWatchlist ? (
                <Icon4 name="favorite" size={responsiveFontSize(2.6)} color="green" />
              ) : (
                <Icon4 name="favorite" size={responsiveFontSize(2.6)} color="#1B1A1A" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.mainBgColor}}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Watchlist2')}>
          <Icon name="arrowleft" size={responsiveFontSize(3)} color="#000" />
        </TouchableOpacity>

        <View style={styles.searchInputContainer}>
          <Icon2 name="search" size={responsiveFontSize(2.6)} color="#000" />
          <TextInput
            ref={searchRef}
            style={{
              paddingLeft: responsiveWidth(4),
              // paddingRight: responsiveWidth(5),
              width: '100%',
              alignSelf: 'center',
              color: '#000',
              fontSize:responsiveFontSize(1.8)
            }}
            placeholder="Search"
            placeholderTextColor="#000"
            onChangeText={txt => {
              onSearch(txt);
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            width: responsiveWidth(10),
            height: responsiveWidth(10),
            borderRadius: responsiveWidth(2),
            backgroundColor: COLORS.bgColor,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={openModal}>
          <Icon3 name="filter" size={responsiveFontSize(2.5)} color="#000" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginHorizontal: responsiveWidth(2),
          marginVertical: responsiveHeight(1),
          width: responsiveWidth(30),
          height: responsiveWidth(10),
          backgroundColor: COLORS.bgColor,
          alignItems: 'flex-start',
          justifyContent: 'center',
          borderRadius: responsiveWidth(1),
        }}>
        <Text
          style={{
            color: COLORS.BottomTab,
            fontWeight: '700',
            fontSize: responsiveFontSize(2),
            paddingLeft:responsiveWidth(2),
          }}>
          Commodity
        </Text>
      </View>
      <View style={styles.topContainer}>
        <View style={styles.topMiddle}>
          <View>
            <Text style={styles.topText1}>Stock Name</Text>
          </View>
          <View style={styles.topLast}>
            <Text style={[styles.topText1, {paddingRight: 20}]}>Price</Text>
            <Text style={styles.topText1}>Change / Vol</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={filterData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />

      {/* model---------------- */}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={styles.modalInner}
                onPress={() => {
                  let tempList = filterData.sort((a, b) =>
                    a.trade_name > b.trade_name ? 1 : -1,
                  );
                  setFilterData(tempList);
                }}>
                <Text style={styles.modalText}>Sort By Trade_name</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalInner}>
                <Text style={styles.modalText}>Low to High Price</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalInner}>
                <Text style={styles.modalText}>High to Low Price</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.closIcon} onPress={closeModal}>
                <Icon6 name="closesquare" size={25} color="#1B1A1A" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* modal end -------------------------- */}
    </View>
  );
};

export default SearchData;

const styles = StyleSheet.create({
  searchContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: responsiveHeight(1),
  },
  searchInputContainer: {
    width: responsiveWidth(60),
    height: responsiveWidth(10),
    backgroundColor: COLORS.bgColor,
    borderRadius: responsiveWidth(1),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingLeft: responsiveWidth(3),
  },
  topContainer: {
    width: responsiveWidth(100),
    height: responsiveWidth(10),
    backgroundColor: '#eeaeca ',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal:responsiveWidth(5),
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
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
  },
  topText: {
    color: COLORS.textColor,
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.bgColor,
    padding: 20,
    borderRadius: 5,
    width: '80%',
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    color: COLORS.textColor,
  },
  closeButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 16,
  },
  modalInner: {
    height: 50,
    width: '100%',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  closIcon: {
    display: 'flex',
    position: 'absolute',
    top: -60,
    right: -45,
  },
});
