import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../constants'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';

// import OTPInputView from '@twotalltotems/react-native-otp-input';
const ForgotPasswordDone = () => {
    const navigation = useNavigation();
    const handleGoBack = () => {
        navigation.goBack();
    };


    return (
        <View style={{ flex: 1, backgroundColor: COLORS.mainBgColor, paddingHorizontal: responsiveWidth(5), paddingTop: responsiveHeight(7) }}>
            <View style={{ marginVertical: responsiveHeight(2), display: 'flex', justifyContent: 'flex-start', alignSelf:'center',marginTop:responsiveHeight(23) }}>
                <View style={{ marginVertical: responsiveHeight(5) }}>
                    <Image source={require('../assets/Image/verify.png')} style={{ width: responsiveWidth(12), height: responsiveHeight(6) }} />
                </View>


                <View>
                    <Text style={{ color: COLORS.black, fontSize: responsiveFontSize(2.2), fontWeight: '600' }}>
                        All Done!
                    </Text>
                    <Text style={{ color: 'gray', marginTop: responsiveHeight(1.5) }}>
                        Your Passward hase been change.
                    </Text>



                </View>
            </View>
        </View>
    )
}

export default ForgotPasswordDone

const styles = StyleSheet.create({})