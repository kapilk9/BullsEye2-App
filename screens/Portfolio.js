import * as React from 'react';
import {useState} from 'react';
import {
  View,
  useWindowDimensions,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import MainLayout from './MainLayout';
import {COLORS} from '../constants';
import SearchBar from '../Src/SearchBar';
import {useNavigation} from '@react-navigation/native';
import {
  setIsTradeModalVisible,
  selectIsTradeModalVisible,
  getLiveTrade,
  getPastTrade,
} from '../Src/redux/market/coinSlice';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native-gesture-handler';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
// import getLiveTrade from '../Src/redux/market/coinSlice';
import ModalComponents from './ModalComponents';
const {height, width} = Dimensions.get('window');

const FirstRoute = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTradeId, setSelectedTradeId] = useState('');
  const isTradeModalVisible = useSelector(selectIsTradeModalVisible);
  const dispatch = useDispatch();
  const liveTradedata = useSelector(state => state.coin.liveTradedata);
  const handleTradeButtonPress = () => {
    dispatch(setIsTradeModalVisible(!isTradeModalVisible));
  };

  // console.log("libve",liveTradedata);

  // console.log("liveTradedata",liveTradedata)
  React.useEffect(() => {
    const timer = setInterval(() => {
      dispatch(getLiveTrade()).catch(error => {
        console.log('Error fetching coin TradeLivedata:', error);
      });
    }, 2000); // 2000 milliseconds = 2 seconds

    return () => {
      clearInterval(timer); // Clear the interval when the component unmounts
    };
  }, []);

  const SquareOff = async tradeId => {
    try {
      console.log('trad', tradeId);
      const token = await AsyncStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `https://scripts.bulleyetrade.com/api/square_off/${tradeId}`,
        config,
      );
      console.log('past Trade', response);
    } catch (error) {
      console.log('error', error);
    }
  };

  // const squreOffhandle = tradeId => {
  //   SquareOff(tradeId);
  // };

  const squreOffhandle = tradeId => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to Square Off?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => SquareOff(tradeId),
        },
      ],
      {cancelable: false},
    );
  };

  const toggleModal = tradeId => {
    setIsModalVisible(!isModalVisible);
    setSelectedTradeId(tradeId);
  };

  const onSaveEdit = async (tradeId, editedValues) => {
    try {
      console.log('trad', tradeId);
      const token = await AsyncStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const payload = {
        stop_loss: editedValues.txtEditStopLoss,
        target: editedValues.txtEditTarget,
      };

      const response = await axios.put(
        `https://scripts.bulleyetrade.com/api/trades/${tradeId}`,
        payload,
        config,
      );

      console.log('past Trade', response);

      // Perform any necessary actions or state updates after the API call is successful
    } catch (error) {
      console.log('error', error);
    }

    toggleModal(); // Close the modal
  };

  // flatlist ui render here

  const renderItemLiveTradeUi = ({item}) => {
    let actualPrice = 0;

    if (item.asset != null) {
      actualPrice = item.asset.price;
    } else {
      actualPrice = 0;
    }

    let profitOrLoss = false;

    if (item.trade_mode === 'buy') {
      if (actualPrice > item.limit) {
        profitOrLoss = true;
      }
    } else if (item.trade_mode === 'sell') {
      if (actualPrice < item.limit) {
        profitOrLoss = true;
      }
    }

    let profitLossVal = 'Pending';

    if (item.is_pending === 0) {
      if (item.trade_mode === 'buy') {
        profitLossVal = (
          (actualPrice - item.limit) *
          item.asset.lot *
          item.max_lot
        ).toFixed(2);
      } else {
        profitLossVal = (
          (item.limit - actualPrice) *
          item.asset.lot *
          item.max_lot
        ).toFixed(2);
      }

      if (profitLossVal > 0) {
        profitLossVal = '+' + profitLossVal;
      } else {
        profitLossVal = +profitLossVal;
      }
    }

    return (
      <View
        style={[
          styles.searchEluation,
          {
            paddingBottom: responsiveHeight(2),
            marginHorizontal: responsiveWidth(3),
          },
        ]}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.header,
              width: responsiveWidth(20),
              height: responsiveHeight(4),
              marginBottom: responsiveHeight(1),
              borderRadius: responsiveWidth(1),
              marginLeft: responsiveWidth(1),
              marginTop: responsiveHeight(0.6),
            }}>
            <Text
              style={{
                color: item.trade_mode === 'buy' ? 'green' : '#BD2929',
                fontWeight: '700',
                fontSize: responsiveFontSize(1.5),
              }}>
              {item.trade_mode.toUpperCase()}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                profitLossVal > 0
                  ? 'green'
                  : profitLossVal < 0
                  ? COLORS.red
                  : COLORS.lightGray,
              width: responsiveWidth(30),
              height: responsiveHeight(4),
              marginBottom: responsiveHeight(1),
              // borderRadius: responsiveWidth(1),
              borderTopLeftRadius: responsiveWidth(1),
              borderBottomLeftRadius: responsiveWidth(1),
              marginRight: responsiveWidth(0.9),
              marginTop: responsiveHeight(0.6),
            }}>
            <View
              style={{
                paddingHorizontal: responsiveWidth(2),
                paddingVertical: responsiveHeight(0.2),
                borderRadius: responsiveWidth(0.5),
                marginRight: responsiveWidth(4),
              }}>
              {profitLossVal == 0 ? (
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: responsiveFontSize(1.5),
                  }}>
                  P&L
                </Text>
              ) : null}
            </View>

            <Text
              style={{
                color: '#fff',
                fontWeight: '700',
                fontSize: responsiveFontSize(1.5),
              }}>
              {profitLossVal}
            </Text>
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: responsiveWidth(3),
            justifyContent: 'space-between',
          }}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={{color: 'gray', fontSize: responsiveFontSize(1.5)}}>
              Lot{' '}
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: responsiveFontSize(1.5),
                fontWeight: '800',
              }}>
              {item.max_lot}
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              // justifyContent: 'space-around',
              flex: 1,
              paddingHorizontal: responsiveWidth(2),
            }}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: '700',
                  fontSize: responsiveFontSize(1.5),
                }}>
                {item.trade_name}
              </Text>
            </View>
          </View>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={{color: 'gray', fontSize: responsiveFontSize(1.5)}}>
              Limit{' '}
            </Text>
            <Text style={{color: 'green', fontSize: responsiveFontSize(1.5)}}>
              {item.limit}
            </Text>
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: responsiveWidth(2),
            justifyContent: 'space-between',
            paddingVertical: responsiveHeight(2),
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingHorizontal: responsiveWidth(2),
            }}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text
                style={{
                  color: 'gray',
                  paddingRight: responsiveWidth(2),
                  fontSize: responsiveFontSize(1.5),
                }}>
                Stop Loss
              </Text>
              <Text style={{color: 'black', fontSize: responsiveFontSize(1.5)}}>
                {item.stop_loss}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingHorizontal: 20,
            }}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={{color: 'gray', fontSize: responsiveFontSize(1.5)}}>
                Target{' '}
              </Text>
              <Text style={{color: 'black', fontSize: responsiveFontSize(1.5)}}>
                {item.target}
              </Text>
              {/* <Text style={{color: 'red'}}> ({})</Text> */}
            </View>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: responsiveWidth(0.9),
          }}>
          <TouchableOpacity
            style={styles.squareOffBtn}
            onPress={() => squreOffhandle(item.id)}>
            <Text
              style={{
                color: '#fff',
                display: 'flex',
                alignSelf: 'center',
                justifyContent: 'center',
                fontSize: responsiveFontSize(1.7),
              }}>
              Square off
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.squareOffBtn,
              {
                width: responsiveWidth(15),
              },
            ]}
            onPress={() => toggleModal(item.id)}>
            <Text
              style={{
                color: '#fff',
                display: 'flex',
                alignSelf: 'center',
                justifyContent: 'center',
                fontSize: responsiveHeight(1.7),
              }}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    //  <MainLayout>
    <View style={{flex: 1, backgroundColor: COLORS.mainBgColor}}>
      <View style={styles.container}>
        <View style={{paddingVertical: 10, marginTop: 5}}>
          <FlatList
            data={liveTradedata}
            renderItem={renderItemLiveTradeUi}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      {isModalVisible && (
        <ModalComponents
          tradeId={selectedTradeId}
          onSave={onSaveEdit}
          liveTradedata={liveTradedata}
        />
      )}
    </View>
    // </MainLayout>
  );
};

const SecondRoute = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const timer = setInterval(() => {
      dispatch(getPastTrade()).catch(error => {
        console.log('Error fetching coin TradeLivedata:', error);
      });
    }, 2000); // 2000 milliseconds = 2 seconds

    return () => {
      clearInterval(timer); // Clear the interval when the component unmounts
    };
  }, []);

  const pastTradedata = useSelector(state => state.coin.pastTradedata);

  console.log('past', pastTradedata);

  const renderItemLiveTradeUi = ({item}) => {
    // Render the data for each item in the FlatList
    const tradeOutcome = parseFloat(item.trade_outcome);
    return (
      <View
        style={[
          styles.searchEluation,
          {
            paddingVertical: responsiveHeight(2),
          },
        ]}>
        {/* profit loss ui  */}

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: responsiveWidth(3),
            justifyContent: 'space-between',
            paddingVertical: responsiveWidth(2),
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingHorizontal: responsiveWidth(5),
            }}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text
                style={{
                  color: 'gray',
                  paddingRight: responsiveWidth(2),
                  fontSize: responsiveFontSize(2),
                }}>
                Profit/Loss
              </Text>
              <Text
                style={{
                  color: item.trade_outcome >= 0 ? 'green' : 'red',  
                  fontSize: responsiveFontSize(2),
                }}>
                {item.trade_outcome}
              </Text>
            </View>
          </View>
        </View>

        {/* end */}

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: responsiveWidth(3),
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingHorizontal: responsiveWidth(5),
            }}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={{color: 'gray', fontSize: responsiveFontSize(2)}}>
                Lot{' '}
              </Text>
              <Text style={{color: 'black', fontSize: responsiveFontSize(2)}}>
                {item.max_lot}
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingHorizontal: responsiveWidth(3),
              }}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: '700',
                    fontSize: responsiveFontSize(2),
                  }}>
                  {item.trade_name}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingHorizontal: responsiveWidth(5),
            }}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={{color: 'gray', fontSize: responsiveFontSize(2)}}>
                Limit-{' '}
              </Text>
              <Text style={{color: 'green', fontSize: responsiveFontSize(2)}}>
                {item.limit}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: responsiveWidth(3),
            justifyContent: 'space-between',
            paddingVertical: responsiveWidth(2),
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingHorizontal: responsiveWidth(5),
            }}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text
                style={{
                  color: 'gray',
                  paddingRight: responsiveWidth(2),
                  fontSize: responsiveFontSize(2),
                }}>
                Stop Loss-
              </Text>
              <Text style={{color: 'black', fontSize: responsiveFontSize(2)}}>
                {item.stop_loss}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingHorizontal: responsiveWidth(5),
            }}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={{color: 'gray', fontSize: responsiveFontSize(2)}}>
                Target-{' '}
              </Text>
              <Text style={{color: 'black', fontSize: responsiveFontSize(2)}}>
                {item.target}
              </Text>
              {/* <Text style={{color: 'red'}}> ({})</Text> */}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.mainBgColor}}>
      <View style={styles.container}>
        <View
          style={{
            paddingVertical: responsiveHeight(0),
            marginTop: responsiveHeight(1),
          }}>
          <FlatList
            data={pastTradedata}
            renderItem={renderItemLiveTradeUi}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  );
};

// const SecondRoute = () => {
//   return (
//     <View style={{flex: 1, backgroundColor: '#e6e6e6'}}>
//       <View style={styles.container}>
//         <View style={styles.sub_container_position}></View>
//       </View>
//     </View>
//   );
// };

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function Portfolio() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'LIVE TRADES'},
    {key: 'second', title: 'PAST TRADES'},
  ]);

  const renderTabBar = props => {
    const handleTabPress = index => {
      setIndex(index);
    };

    return (
      <TabBar
        {...props}
        style={{backgroundColor: COLORS.bgColor, height: responsiveWidth(11)}} // Set your desired header color here
        labelStyle={{
          color: COLORS.textColor,
          fontSize: responsiveFontSize(1.7),
          fontWeight: '700',
        }}
        indicatorStyle={{backgroundColor: '#1A6164'}}
        activeColor="#1A6164"
        pressColor="#1A6164" // Add pressColor prop for touch feedback
        onTabPress={({index}) => handleTabPress(index)} // Handle tab press event
      />
    );
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
    />
  );
}

const styles = StyleSheet.create({
  // container: {
  //   width: width,
  //   height: height,
  //   marginTop: 80,
  //   borderTopLeftRadius: 20,
  //   borderTopRightRadius: 20,
  //   backgroundColor: '#ffff',
  // },
  sub_container_holdings: {
    width: '90%',
    height: height - 600,
    marginTop: 100,
    borderRadius: 7,
    backgroundColor: '#fff',
    position: 'absolute',
    display: 'flex',
    alignSelf: 'center',

    // alignItems: 'center',
    top: -150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // Add other styles as needed
  },
  sub_container_position: {
    width: '90%',
    height: height - 620,
    marginTop: 100,
    borderRadius: 7,
    backgroundColor: '#fff',
    position: 'absolute',
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    top: -150,
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // Add other styles as needed
  },

  searchEluation: {
    borderBottomWidth: 0.1,

    shadowColor: '#b3b',
    shadowOffset: {
      width: responsiveWidth(3),
      height: responsiveWidth(3),
      borderRadius: responsiveWidth(1),
      borderBottomWidth: 0.1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  squareOffBtn: {
    width: responsiveWidth(25),
    height: responsiveHeight(4),
    backgroundColor: COLORS.header,
    display: 'flex',
    justifyContent: 'center',
    borderRadius: responsiveWidth(1),
  },
});
