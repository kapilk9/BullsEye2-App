import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../constants'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPasswordSet = () => {
  const navigation = useNavigation();

  // const handleGoBack = () => {
  //   navigation.goBack();
  // };

  const SignupSchema = Yup.object().shape({
    Oldpassword: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    Newpassword: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirm_password: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('Newpassword')], 'Passwords do not match')
      .min(8, 'Confirm password must be at least 8 characters long'),
  });

  const PasswordReset = async (values) => {
    try {
      const access_token = await AsyncStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      const payload = {
        old_password: values.Oldpassword,
        new_password: values.Newpassword,
        confirm_password: values.confirm_password,
      };

      const res = await axios.post(
        'https://scripts.bulleyetrade.com/api/mobile/password-update',
        payload,
        config
      );

      console.log('Response:', res.data);

      if (res.data.result === true) {
        const message = res.data.message;
        alert(message);
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  const [showpassward, SetShowPassward] = useState(true);
  const [showpassward1, SetShowPassward1] = useState(true);
  const [showpassward2, SetShowPassward2] = useState(true);

  

  const togglePassward = (field) => {
    if (field === 'Oldpassword') {
      SetShowPassward(!showpassward);
    } else if (field === 'Newpassword') {
      SetShowPassward1(!showpassward1);
    } else if (field === 'confirm_password') {
      SetShowPassward2(!showpassward2);
    }
  }

  return (
    <Formik
      initialValues={{
        Oldpassword: '',
        Newpassword: '',
        confirm_password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={PasswordReset}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid }) => (
        <ScrollView style={{ flex: 1, backgroundColor: '#E1D7E0', }}>
          <View style={{ paddingHorizontal: responsiveWidth(5), paddingTop: responsiveHeight(2) }}>
            <View style={{ marginVertical: responsiveHeight(2), display: 'flex', justifyContent: 'flex-start' }}>
              <View style={{ marginVertical: responsiveHeight(0.2), alignSelf: 'center' }}>
                <Image source={require('../assets/Image/resetpassward.png')}
                  style={{ width: responsiveWidth(60), height: responsiveHeight(25) }} />
              </View>

              <View>
                <Text style={{ color: COLORS.black, fontSize: responsiveFontSize(2.2), fontWeight: '600' }}>
                  Set New Password
                </Text>
                <Text style={{ color: 'gray', marginTop: responsiveHeight(1.5) }}>
                  Must be at least 8 characters.
                </Text>

                <View>
                  <Text style={{ color: COLORS.black, marginTop: responsiveHeight(2), }}>
                    Old Password
                  </Text>

                  <View style={{
                    width: responsiveWidth(88),
                    height: responsiveHeight(8),
                    borderRadius: responsiveWidth(2),
                    marginTop: responsiveHeight(1),
                    borderWidth: 0.5,
                    paddingHorizontal: responsiveWidth(2),
                    paddingVertical: responsiveHeight(1.5),
                    fontSize: responsiveFontSize(2.9),
                    color: '#000',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>

                    <TextInput
                      secureTextEntry={showpassward}
                      placeholderTextColor={'gray'}
                      value={values.Oldpassword}
                      onChangeText={handleChange('Oldpassword')}
                      onBlur={handleBlur('Oldpassword')}
                      style={{ flex: 1 }}
                    />

                    <TouchableOpacity onPress={() => togglePassward('Oldpassword')}>
                      {showpassward ? (
                        <Image source={require('../assets/Image/view.png')} style={{ width: 20, height: 20, marginRight: responsiveWidth(4) }} />
                      ) : (<Image source={require('../assets/Image/hide.png')} style={{ width: 20, height: 20, marginRight: responsiveWidth(4) }} />)}
                    </TouchableOpacity>
                  </View>
                  {touched.Oldpassword && errors.Oldpassword && (
                    <Text style={{
                      color: 'red', paddingLeft: responsiveWidth(1),
                      paddingBottom: responsiveHeight(1), marginTop: responsiveHeight(2)
                    }}>
                      {errors.Oldpassword}
                    </Text>
                  )}



                  <Text style={{ color: COLORS.black, marginTop: responsiveHeight(1), marginLeft: responsiveWidth(1) }}>
                    New Password
                  </Text>

                  <View style={{
                    width: responsiveWidth(88),
                    height: responsiveHeight(8),
                    borderRadius: responsiveWidth(2),
                    marginTop: responsiveHeight(1),
                    borderWidth: 0.5,
                    paddingHorizontal: responsiveWidth(2),
                    paddingVertical: responsiveHeight(1.5),
                    fontSize: responsiveFontSize(2.9),
                    color: '#000',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <TextInput
                      secureTextEntry={showpassward1}
                      placeholderTextColor={'gray'}

                      value={values.Newpassword}
                      onChangeText={handleChange('Newpassword')}
                      onBlur={handleBlur('Newpassword')}
                    />

                    <TouchableOpacity onPress={() => togglePassward('Newpassword')}>
                      {showpassward1 ? (
                        <Image source={require('../assets/Image/view.png')} style={{ width: 20, height: 20, marginRight: responsiveWidth(4) }} />
                      ) : (<Image source={require('../assets/Image/hide.png')} style={{ width: 20, height: 20, marginRight: responsiveWidth(4) }} />)}

                    </TouchableOpacity>


                  </View>


                  {touched.Newpassword && errors.Newpassword && (
                    <Text style={{
                      color: 'red', paddingLeft: responsiveWidth(1),
                      paddingBottom: responsiveHeight(1), marginTop: responsiveHeight(2)
                    }}>
                      {errors.Newpassword}
                    </Text>
                  )}

                  <Text style={{ color: COLORS.black, marginTop: responsiveHeight(1), marginLeft: responsiveWidth(1) }}>
                    Confirm Password
                  </Text>

                  <View style={{
                    width: responsiveWidth(88),
                    height: responsiveHeight(8),
                    borderRadius: responsiveWidth(2),
                    marginTop: responsiveHeight(1),
                    borderWidth: 0.5,
                    paddingHorizontal: responsiveWidth(2),
                    paddingVertical: responsiveHeight(1.5),
                    fontSize: responsiveFontSize(2.9),
                    color: '#000',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',

                  }}>
                    <TextInput
                      secureTextEntry={showpassward2}
                      placeholderTextColor={'gray'}

                      value={values.confirm_password}
                      onChangeText={handleChange('confirm_password')}
                      onBlur={handleBlur('confirm_password')}
                    />


                    <TouchableOpacity onPress={() => togglePassward('confirm_password')}>
                      {showpassward2 ? (
                        <Image source={require('../assets/Image/view.png')} style={{ width: 20, height: 20, marginRight: responsiveWidth(4) }} />
                      ) : (<Image source={require('../assets/Image/hide.png')} style={{ width: 20, height: 20, marginRight: responsiveWidth(4) }} />)}

                    </TouchableOpacity>

                  </View>



                  {touched.confirm_password && errors.confirm_password && (
                    <Text style={{
                      color: 'red', paddingLeft: responsiveWidth(1),
                      paddingBottom: responsiveHeight(1), marginTop: responsiveHeight(2)
                    }}>
                      {errors.confirm_password}
                    </Text>
                  )}
                </View>





              </View>
            </View>

          </View>
          <View style={{
            flex: 1,
            width: responsiveWidth(88),
            height: responsiveWidth(16),
            // justifyContent: 'center',
            // alignItems: 'center',
            marginTop: responsiveHeight(1),
            marginLeft: responsiveWidth(5),
            marginBottom:responsiveHeight(2)
          }}>
            <LinearGradient
              colors={['#eeaeca', '#94bbe9']} // Replace these colors with the two colors you want
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              style={{
                flex: 1,
                borderRadius: responsiveWidth(2),
              }}
            >
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // You can set other styles as per your design
                }}
                disabled={!isValid}
              >
                <Text
                  style={{
                    // textAlign: 'center',
                    fontWeight: '700',
                    fontSize: responsiveFontSize(2.5),
                    color: '#000',
                    
                  }}
                >
                  Set New Password
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      )
      }
    </Formik >
  );
}

export default ForgotPasswordSet;

const styles = StyleSheet.create({});
