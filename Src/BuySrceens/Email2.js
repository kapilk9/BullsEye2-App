import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../constants';
import { icons } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { postData } from '../../constants/hooks/ApiHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"


//  all pages responsive
const Email2 = onPress => {
  const [emailOtp, setEmailOtp] = useState('');
  const handleGetOTPVerification = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      const payload = { otp: emailOtp, id: id };
      const response = await postData(
        'https://panel.bulleyetrade.com/api/mobile/verify-email-otp',
        payload,
      );


      const { status, payload: responseData } = response.data;
      if (status === 200) {
        const { mobile_verified_at, aadhar_verified_at } =
          responseData;


        // Check mobile verification
        if (mobile_verified_at === null) {
          navigation.navigate('Mobile');
          return;
        }

        // Check Aadhar verification
        if (aadhar_verified_at === null) {
          navigation.navigate('Document');
          return;
        }

        // All verifications passed, navigate to the main screen
        navigation.navigate('MainLayout');
      }
      //   if(response.data.status === 200) {
      //     navigation.navigate('Mobile')
      //   }
      console.log('Response emailOtp:', response);
      // Handle the response or navigate to the next screen
    } catch (error) {
      console.error(error);
      // Handle error if needed
    }
  };

  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: '#d6e4f2' }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: responsiveHeight(15),
        }}>
        <Image source={icons.mail} style={{ width: responsiveWidth(40), height: responsiveWidth(40) }} />
      </View>


      <View>
        <Text
          style={{
            fontSize: responsiveFontSize(3),
            color: '#000',
            marginTop: responsiveHeight(2),
            alignSelf: 'center',
            fontWeight: '600'
          }}>

          OTP Verification
        </Text>
      </View>
      <View
        style={{
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: responsiveWidth(4),
        }}>
        <Text
          style={{
            fontSize: responsiveFontSize(3),
            // paddingLeft: 20,
            marginTop: responsiveHeight(2),
            paddingHorizontal: responsiveWidth(1),
            alignSelf: 'center',
            alignItems: 'center',
            fontWeight: '200',
            color: '#000'
          }}
          numberOfLines={2}>
          Please Enter the 6 digit code send to your email address
        </Text>
      </View>

      <View
        style={{
          marginHorizontal: responsiveWidth(2),
          marginTop: responsiveHeight(5),
          width: responsiveWidth(90),
          height: responsiveWidth(20),
        }}>
        <TextInput
          style={{
            borderRadius: responsiveWidth(2),
            borderWidth: 0.5,
            borderColor: '#757575',
            marginLeft: responsiveWidth(3),
            paddingHorizontal: responsiveWidth(3),
            color: '#000'
          }}
          placeholder="Enter your valid OTP"
          placeholderTextColor='#000'
          value={emailOtp}
          onChangeText={text => setEmailOtp(text)}
        />
        <View>
          <TouchableOpacity onPress={handleGetOTPVerification}>
            <View
              style={{
                width: responsiveWidth(30),
                height: responsiveWidth(8),
                borderRadius:responsiveWidth(2),
                borderWidth: 0.5,
                borderColor: '#757575',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: responsiveHeight(2),
                alignSelf: 'center',
                backgroundColor: '#ACC8E5',
                marginLeft: responsiveWidth(60),
              }}>
              <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000' }}>RESEND OTP</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={handleGetOTPVerification}>
        <View
          style={{
            width: responsiveWidth(90),
            height: responsiveWidth(15),
            borderRadius: responsiveWidth(2),
            borderWidth: 0.5,
            borderColor: '#757575',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: responsiveHeight(6),
            alignSelf: 'center',
            backgroundColor: '#ACC8E5',
          }}>
          <Text style={{ fontSize: responsiveFontSize(2), color: '#000' }}>SUBMIT OTP</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Email2;
