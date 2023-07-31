import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../constants';
import { icons } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postData } from '../../constants/hooks/ApiHelper';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";


// all pages responsive 

const Mobile2 = (onPress) => {

    const [mobileOtpVer, setMobileOtpVer] = useState('')
    const handleGetMobileOTPVerification = async () => {
        try {
            const id = await AsyncStorage.getItem('id');
            const payload = { mobile_otp: mobileOtpVer, id: id };
            const response = await postData(
                'https://panel.bulleyetrade.com/api/mobile/verify-mobile-otp',
                payload,
            );

            const { status, payload: responseData } = response.data;
            if (status === 200) {
                const { aadhar_verified_at } =
                    responseData;

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
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: responsiveHeight(15) }}>
                <Image source={icons.smartphone} style={{ width: responsiveWidth(40), height: responsiveWidth(40) }} />
            </View>

            <View style={{ marginTop: responsiveHeight(2), alignSelf: 'center' }}>
                <Text style={{ fontSize: responsiveFontSize(3), color: '#000', textDecorationLine: 'underline', }}>OTP Verification</Text>


            </View>
           
            <View style={{ flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: responsiveFontSize(3), paddingLeft: responsiveWidth(5), 
                marginTop:responsiveHeight(2), alignSelf: 'center', fontWeight: '200', color: '#000' }}
                    numberOfLines={2}>
                    please enter the 6 digit code send to your Mobile no.
                </Text>
            </View>

            <View style={{
                marginLeft: responsiveWidth(5), marginTop: responsiveHeight(5), width: responsiveWidth(90),
                height: responsiveWidth(20),
            }}>

                <TextInput
                    style={{
                        borderRadius: responsiveWidth(2),
                        borderWidth: 0.5,
                        borderColor: "#757575",
                        marginLeft: responsiveWidth(2),
                        paddingHorizontal: responsiveWidth(3),
                        color: '#000',
                        fontWeight:"200"

                    }}
                    placeholder="Enter your valid OTP"
                    placeholderTextColor="#000"
                    value={mobileOtpVer}
                    onChangeText={text => setMobileOtpVer(text)}
                    keyboardType="numeric"
                />
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("")}>
                        <View
                            style={{
                                width: responsiveWidth(30),
                                height: responsiveWidth(10),
                                borderRadius: responsiveWidth(2),
                                borderWidth: 0.5,
                                borderColor: "#757575",
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: responsiveHeight(1),
                                alignSelf: 'center',
                                backgroundColor: '#ACC8E5',
                                marginLeft: responsiveWidth(60)
                            }}
                        >
                            <Text style={{ fontSize: responsiveFontSize(1.7), color: '#000' }}>RESEND OTP</Text>
                        </View>
                    </TouchableOpacity>
                </View>


            </View>
            <TouchableOpacity onPress={handleGetMobileOTPVerification}>
                <View
                    style={{
                        width: responsiveWidth(90),
                        height: responsiveWidth(14),
                        borderRadius: responsiveWidth(2),
                        borderWidth: 0.5,
                        borderColor: "#757575",
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: responsiveHeight(10),
                        alignSelf: 'center',
                        backgroundColor: '#ACC8E5',
                    }}
                >
                    <Text style={{ fontSize: responsiveFontSize(2), color: '#000' }}>SUBMIT OTP</Text>
                </View>
            </TouchableOpacity>



        </View>
    );
};

export default Mobile2;
