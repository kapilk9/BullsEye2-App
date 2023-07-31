import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { postData } from '../../constants/hooks/ApiHelper';
import { icons } from '../../constants';
import { ScrollView } from 'react-native-gesture-handler';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

// all pages responsive


const EmailVerification = ({ route }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
    }
  }, [route.params?.email]);

  const handleGetOTP = async () => {
    try {
      const payload = { email: email };
      const response = await postData(
        'https://panel.bulleyetrade.com/api/mobile/email-verify',
        payload
      );

      if (response.data.status === 200) {
        navigation.navigate('Email2')
      }
      // console.log('Response:', response.data);
      // Handle the response or navigate to the next screen
    } catch (error) {
      console.error(error);
      // Handle error if needed
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#d6e4f2' }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: responsiveHeight(20) }}>
        <Image source={icons.mail} style={{ width: responsiveWidth(40), height: responsiveWidth(40) }} />
      </View>

      <View style={{ marginTop: responsiveHeight(2), alignSelf: 'center' }}>
        <Text style={{ fontSize: responsiveHeight(3.5), color: '#000', textDecorationLine: 'underline' }}>Email Verification</Text>
      </View>

      <View>
        <Text style={{ fontSize: responsiveFontSize(2.8), color: '#000', paddingLeft: responsiveWidth(5), marginTop: responsiveHeight(3) }}>Verification code on your Email ID</Text>
      </View>

      <View style={{ flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{
          fontSize: responsiveFontSize(3.5), paddingLeft: responsiveWidth(5), marginTop: responsiveHeight(2),
          alignSelf: 'center', fontWeight: '200', color: '#000'
        }} numberOfLines={2}>
          We will send the verification code to this Email ID
        </Text>
      </View>

      <View style={{ marginLeft: responsiveWidth(3), marginTop: responsiveHeight(3), width: responsiveWidth(90),
         height: responsiveWidth(20) }}>
        <TextInput
          style={{
            borderRadius: responsiveWidth(2),
            borderWidth: 0.5,
            borderColor: '#757575',
            marginLeft: responsiveWidth(2),
            paddingHorizontal: responsiveWidth(3),
            color: "#000"
          }}
          placeholder="Enter your valid Email ID"
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>

      <TouchableOpacity onPress={handleGetOTP}>
        <View
          style={{
            width: responsiveWidth(90),
            height: responsiveWidth(15),
            borderRadius: responsiveWidth(2),
            borderWidth: 0.5,
            borderColor: '#757575',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: responsiveHeight(2),
            alignSelf: 'center',
            backgroundColor: '#ACC8E5',
          }}
        >
          <Text style={{ fontSize: 15, color: '#000' }}>GET OTP</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EmailVerification;
