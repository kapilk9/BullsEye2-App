import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  LogBox,
  Switch,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {fetchCoinData} from '../../Src/redux/market/coinSlice';
import {useRoute} from '@react-navigation/native';
import {COLORS} from '../../constants';
import {postData} from '../../constants/hooks/ApiHelper';
import Toast from 'react-native-toast-message';
import {
  incrementCounter,
  decrementCounter,
} from '../../Src/redux/market/coinSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import axios from 'axios';
// import SwitchToggle from "react-native-switch-toggle";
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const {width, height} = Dimensions.get('window');

const BuyScreen = () => {
  const route = useRoute();
  const selectedItem = route.params?.selectedItem; // Retrieve the selected item from the route parameters
  const counter = useSelector(state => state.coin.counter);
  const [text, setText] = useState('');
  const [textT, setTextT] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const coinsData = useSelector(state => state.coin.data);
  const [requiredValue, setRequiredValue] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);
  const [buyInputeFeild, setBuyInputeFeild] = useState({
    trade_mode: 'buy',
    trade_name: '',
    max_lot: '',
    market_price: '',
    limit: '',
    target: '',
    stop_loss: '',
    trade_type: 'intraday',
    wallet_pin: '',
  });

  const {
    trade_name,
    max_lot,
    market_price,
    limit,
    target,
    stop_loss,
    wallet_pin,
  } = buyInputeFeild;

  const handleInputChange = (name, value) => {
    if (!isEnabled) {
      // If the toggle button is not enabled, set stop_loss and target to 0
      setBuyInputeFeild(prevState => ({
        ...prevState,
        [name]: value,
        stop_loss: '0',
        target: '0',
      }));
    } else {
      // If the toggle button is enabled, set the values based on the input
      setBuyInputeFeild(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  

  const handleIncrement = () => {
    dispatch(incrementCounter());
  };

  const handleDecrement = () => {
    if (counter === 1) {
      return;
    }
    dispatch(decrementCounter());
  };

  const handleButtonPress = buttonId => {
    setSelectedButton(buttonId);

    if (buttonId === 2) {
      setBuyInputeFeild({
        ...buyInputeFeild,
        market_price: 'SET_TRADE',
        limit: selectedItem ? selectedItem.price.toString() : '',
      });
    } else if (buttonId === 1) {
      setBuyInputeFeild({
        ...buyInputeFeild,
        market_price: '',
        limit: '',
      });
    }
  };


  // const handleButtonPress = buttonId => {
  //   setSelectedButton(buttonId);
  
  //   if (buttonId === 2) {
  //     setBuyInputeFeild({
  //       ...buyInputeFeild,
  //       market_price: 'SET_TRADE',
  //       limit: selectedItem ? selectedItem.price.toString() : '',
  //     });
  //   } else if (buttonId === 1) {
  //     // Check if the "Limit" button is pressed and the "Buying Price" input field is manually filled
  //     if (textT) {
  //       // Set the manually entered value as the "Buying Price" when "Limit" is selected
  //       setBuyInputeFeild({
  //         ...buyInputeFeild,
  //         market_price: textT,
  //         limit: '',
  //       });
  //     } else {
  //       // If the "Buying Price" input field is empty, set it to the selected item's price
  //       setBuyInputeFeild({
  //         ...buyInputeFeild,
  //         market_price: '',
  //         limit: selectedItem ? selectedItem.price.toString() : '',
  //       });
  //     }
  //   }
  // };
  



  const handlePressIn = event => {
    event.persist();
    setIsPressed(true);
  };

  const handlePressOut = event => {
    event.persist();
    setIsPressed(false);
  };

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchCoinData());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateRequiredValue = (lot, price) => {
    const calculatedValue = lot * price;
    setRequiredValue(calculatedValue);
  };

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  const renderButton = (buttonId, buttonColor, title) => (
    <TouchableHighlight
      key={buttonId}
      style={[
        styles.button,
        {
          backgroundColor: selectedButton === buttonId ? 'green' : '#112A46',
        },
      ]}
      underlayColor={selectedButton === buttonId ? 'green' : buttonColor}
      onPress={() => handleButtonPress(buttonId)}>
      <View>
        <Text
          style={{
            color: selectedButton === buttonId ? 'white' : 'white',
            fontSize: responsiveFontSize(2),
          }}>
          {title}
        </Text>
      </View>
    </TouchableHighlight>
  );

  const baseUrl = 'https://scripts.bulleyetrade.com/api/trades';

  const BuyKnow = async () => {
    if (
      !selectedItem ||
      // !market_price ||
      !limit ||
      !target ||
      !stop_loss ||
      !wallet_pin
    ) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'All fields are required',
        position: 'bottom',
        bottomOffset: 100, // Adjust the offset value to position the toast higher or lower
        textStyle: {fontSize: responsiveFontSize(2)},
      });
      return;
    }

    const payload = {
      trade_mode: 'buy',
      trade_name: selectedItem ? selectedItem.trade_name : '',
      max_lot: counter.toString(),
      market_price,
      limit,
      target,
      stop_loss,
      trade_type: 'intraday',
      wallet_pin,
    };

    console.log('payload', payload);

    try {
      const access_token = await AsyncStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${access_token}`,
      };
      // console.log('token', access_token);
      console.log("api hit krne se pahle ",payload)
      const res = await axios.post(baseUrl, payload, {headers});
      console.log('res', res);

      if (res.data.Status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Trade placed successfully',
        });
        navigation.navigate('MainLayout');
      } else if (res.data.Status === 422)
        if (Data.wallet_pin) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Please enter valid wallet pin',
          });
          console.log('res 422', res);
        }
    } catch (error) {
      console.error('dsfds', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {/* header part .................. */}
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: 15,
              backgroundColor: COLORS.bgColor,
              paddingVertical: 15,
            }}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <TouchableOpacity onPress={goBack}>
                <AntDesign
                  name="arrowleft"
                  size={responsiveFontSize(3)}
                  color="#000"
                  style={{marginRight: responsiveWidth(2)}}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#000',
                  fontWeight: '700',
                  fontSize: responsiveFontSize(2),
                }}>
                {selectedItem ? selectedItem.trade_name : ''}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome
                name="inr"
                size={responsiveFontSize(2.5)}
                color="#000"
                style={{marginRight: responsiveWidth(2)}}
              />
              <Text
                style={{
                  color: '#000',
                  fontWeight: '700',
                  marginRight: responsiveWidth(2),
                  fontSize: responsiveFontSize(2),
                }}>
                {selectedItem ? selectedItem.price : ''}
              </Text>
            </View>
          </View>
          {/* intraday part ........... */}

          <View style={styles.intradayBox}>
            <Text style={{color: '#fff', fontSize: responsiveFontSize(2)}}>
              Intraday
            </Text>
          </View>

          {/* Buying price & lots .............. */}
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginHorizontal: responsiveWidth(4),
            }}>
            <View
              style={{
                paddingVertical: responsiveHeight(1),
                width: responsiveWidth(42),
                justifyContent: 'center',
                display: 'flex',
                alignSelf: 'center',
              }}>
              <Text style={{color: '#000', fontSize: responsiveFontSize(1.8)}}>
                Max Lot
              </Text>
              <View
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={[
                  styles.inputWrrapper,
                  {borderColor: isPressed ? '#BBC7CF' : COLORS.TopBox},
                ]}>
                <View style={styles.inputContainer}>
                  <TouchableOpacity onPress={handleDecrement}>
                    <AntDesign
                      name="minuscircleo"
                      size={responsiveFontSize(2.5)}
                      color="#000"
                      style={{marginRight: responsiveWidth(5)}}
                    />
                  </TouchableOpacity>
                  <TextInput
                    style={[
                      [
                        styles.textInput,
                        {flex: 1 / 2, paddingHorizontal: responsiveWidth(3)},
                      ],
                    ]}
                    value={counter.toString()} // Convert the counter value to a string before passing it to the text input
                    onChangeText={value =>
                      handleInputChange('counter', parseInt(value, 10))
                    } // Parse the value as an integer before passing it to the handleInputChange functionp
                    keyboardType="numeric"
                    maxLength={7}
                    placeholderTextColor={'#000'}
                  />
                  {/* <Text>{selectedItem ? selectedItem.price : ''} </Text> */}
                  <TouchableOpacity onPress={handleIncrement}>
                    <AntDesign
                      name="pluscircleo"
                      size={responsiveFontSize(2.5)}
                      color="#000"
                      style={{marginRight: responsiveWidth(1)}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View
              style={{
                paddingVertical: responsiveHeight(1),
                width: responsiveWidth(42),
                justifyContent: 'center',
                display: 'flex',
                alignSelf: 'center',
              }}>
              <Text style={{color: '#000', fontSize: responsiveFontSize(1.8)}}>
                Buying Price
              </Text>
              <View
                style={[
                  styles.inputWrrapper,
                  {borderColor: isPressed ? 'red' : COLORS.TopBox},
                ]}>
                <View
                  style={[
                    styles.inputContainer,
                    {justifyContent: 'flex-start'},
                  ]}>
                  <TextInput
                    style={styles.textInput}
                    value={limit}
                    // onChangeText={handleInputChange}
                    onChangeText={value => handleInputChange('limit', value)}
                    keyboardType="numeric"
                    placeholder="₹"
                    placeholderTextColor={'#000'}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.separator}></View>
          <View
            style={[styles.sectionHeader, {marginTop: responsiveHeight(1)}]}>
            <Text style={styles.sectionHeaderText}>Order Type</Text>
          </View>
          <View style={styles.buttonContainer}>
            {renderButton(1, '#BBC7CF', 'Limit')}
            {renderButton(2, '#BBC7CF', 'Market')}
          </View>
          <View style={styles.separator}></View>
          {/* stoploss section -------------- */}

          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: responsiveWidth(3),
            }}>
            <View>
              <Text style={[styles.sectionHeaderText, {display: 'flex'}]}>
                Stop Loss Order
              </Text>
            </View>

            <View>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? 'green' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
          {isEnabled && (
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginHorizontal: responsiveWidth(4),
              marginTop: responsiveHeight(3),
            }}>
            <View style={{display: 'flex', justifyContent: 'center'}}>
              <Text style={{color: '#000', fontSize: responsiveFontSize(2.3)}}>
                Stop Loss
              </Text>
              <View
                style={{
                  paddingVertical: responsiveHeight(1),
                  width: responsiveWidth(42),
                  justifyContent: 'center',
                  display: 'flex',
                  alignSelf: 'center',
                }}>
                <View
                  style={[
                    styles.inputWrrapper,
                    {borderColor: isPressed ? 'red' : COLORS.TopBox},
                  ]}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={{
                        fontSize: responsiveFontSize(2),
                        fontWeight: '400',
                        
                      }}
                      placeholder="Set stop loss"
                      keyboardType='numeric'
                      placeholderTextColor={COLORS.gray1}
                      value={stop_loss}
                      onChangeText={value =>
                        handleInputChange('stop_loss', value)
                      }
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={{display: 'flex', justifyContent: 'center'}}>
              <Text style={{color: '#000', fontSize: responsiveFontSize(2.3)}}>
                Target
              </Text>
              <View
                style={{
                  paddingVertical: responsiveHeight(1),
                  width: responsiveWidth(42),
                  justifyContent: 'center',
                  display: 'flex',
                  alignSelf: 'center',
                }}>
                <View
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  style={[
                    styles.inputWrrapper,
                    {borderColor: isPressed ? '#BBC7CF' : COLORS.TopBox},
                  ]}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={{
                        fontSize: responsiveFontSize(2),
                        fontWeight: '400',
                      }}
                      placeholder="Enter target"
                      placeholderTextColor={COLORS.gray1}
                      value={target}
                      onChangeText={value => handleInputChange('target', value)}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          )} 

          <View style={styles.separator}></View>

          {/* wallet pin .......... */}

          <View style={[styles.textInput]}>
            <Text
              style={{
                fontSize: responsiveFontSize(2.5),
                fontWeight: '600',
                color: COLORS.secondary,
                marginBottom: responsiveHeight(1),
              }}>
              Wallet Pin
            </Text>
            <View style={{alignItems:'center',justifyContent:"center",
            marginHorizontal:responsiveWidth(2)}}>
              <TextInput
                style={[
                  styles.inputContainer,
                  {
                    color: 'gray',
                    paddingHorizontal: responsiveWidth(1),
                    borderRadius: responsiveWidth(3),
                    fontSize: responsiveFontSize(1.9),
                    paddingVertical:responsiveHeight(1),
                    paddingHorizontal:responsiveWidth(6)
                    // // paddingLeft: responsiveWidth(3),
                  },
                ]}
                placeholderTextColor={'#000'}
                secureTextEntry
                keyboardType='numeric'
                placeholder="Wallet PIN"
                value={wallet_pin}
                onChangeText={value => handleInputChange('wallet_pin', value)}
              />
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: 'green',
              width: responsiveWidth(90),
              height: responsiveWidth(14),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius: responsiveWidth(3),
              marginTop: responsiveHeight(3),
              marginBottom:responsiveHeight(2)
            }}
            onPress={BuyKnow}>
            <Text style={{color: '#ffff' ,fontSize:responsiveFontSize(2)}}>Buy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBgColor,

    // height:'100%'
  },

  intradayBox: {
    backgroundColor: '#112A46',
    width: responsiveWidth(20),
    paddingVertical: responsiveHeight(1),
    marginLeft: responsiveWidth(3),
    marginVertical: responsiveHeight(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(1),
  },
  inputWrrapper: {
    borderColor: '#BBC7CF',
    borderWidth: 0.5,
    borderRadius: responsiveWidth(1),
    marginTop: responsiveHeight(2),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(2),
    backgroundColor: '#bdd3ea',
  },
  textInput: {
    fontSize: responsiveFontSize(2.5),
    flex: 1,
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    borderBottomColor: '#BBC7CF',
    borderBottomWidth: 0.5,
    marginVertical: responsiveHeight(2),
    marginHorizontal: responsiveWidth(2),
  },
  sectionHeader: {
    marginLeft: responsiveWidth(3),
  },
  sectionHeaderText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '600',
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: responsiveHeight(2),
    marginLeft: responsiveWidth(5),
  },
  button: {
    padding: responsiveHeight(1.8),
    borderRadius: responsiveWidth(1),
    marginBottom: responsiveHeight(1),
    marginRight: responsiveWidth(5),
  },
  buyButton: {
    display: 'flex',
    bottom: 0,
    width: width - 20,
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -30,
  },
  buyButtonText: {
    fontSize: 20,
    color: 'white',
  },
});

export default BuyScreen;
