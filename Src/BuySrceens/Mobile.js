import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../constants';
import { icons } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { postData } from '../../constants/hooks/ApiHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"


// all pages responsive

const Mobile = (onPress) => {
  const [mobile, setMobile] = useState('');



  const handleMobileGetOTP = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      const payload = { mobile: mobile, id: id };
      const response = await postData(
        'https://panel.bulleyetrade.com/api/mobile/mobile-verify',
        payload
      );

      if (response.data.status === 200) {
        navigation.navigate('Mobile2',)
      }
      console.log('Response:', response);
      // Handle the response or navigate to the next screen
    } catch (error) {
      console.error(error);
      // Handle error if needed
    }
  };


  const navigation = useNavigation();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#d6e4f2' }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: responsiveHeight(15) }}>
        <Image source={icons.smartphone} style={{ width: responsiveWidth(40), height: responsiveWidth(40) }} />
      </View>

      <View style={{ marginTop: responsiveHeight(2), alignSelf: 'center' }}>
        <Text style={{ fontSize: responsiveFontSize(3), color: '#000', textDecorationLine: 'underline', }}>Mobile Verification</Text>
      </View>
      <View>
        <Text style={{ fontSize: responsiveFontSize(2.4), color: '#000', paddingLeft: responsiveWidth(4), marginTop: responsiveHeight(4), }} numberOfLines={2}> Verification code on your Mobile Number</Text>
      </View>
      <View style={{ flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{
          fontSize: responsiveFontSize(3.4), paddingLeft: responsiveWidth(5),
          marginTop: responsiveHeight(2), alignSelf: 'center', fontWeight: '200', color: '#000'
        }}
          numberOfLines={2}>
          We will send verification code on this mobile no.
        </Text>
      </View>

      <View style={{
        marginLeft: responsiveWidth(4), marginTop: responsiveHeight(5), width: responsiveWidth(90),
        height: responsiveWidth(20),
      }}>

        <TextInput
          style={{
            borderRadius: responsiveWidth(2),
            borderWidth: 0.5,
            borderColor: "#757575",
            marginLeft: responsiveWidth(2),
            paddingHorizontal: responsiveWidth(3),
            color: '#000'

          }}
          placeholder="Enter your valid mobile number"
          placeholderTextColor="#000"
          value={mobile}
          onChangeText={text => setMobile(text)}
          keyboardType='numeric'
        />


      </View>
      <TouchableOpacity onPress={handleMobileGetOTP}>
        <View
          style={{
            width: responsiveWidth(90),
            height: responsiveWidth(15),
            borderRadius: responsiveWidth(2),
            borderWidth: 0.5,
            borderColor: "#757575",
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: responsiveWidth(5),
            alignSelf: 'center',
            backgroundColor: '#ACC8E5',
          }}
        >
          <Text style={{ fontSize: responsiveFontSize(2), color: '#000' }}>GET OTP</Text>
        </View>
      </TouchableOpacity>



    </ScrollView>
  );
};

export default Mobile;
