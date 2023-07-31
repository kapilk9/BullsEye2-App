import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {COLORS} from '../constants';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/AntDesign';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const ForgotPassword = () => {
  const navigation = useNavigation();
  // const [email, setEmail] = useState('');
  const emailOtpApi = async values => {
    try {
      const res = await axios.post(
        'https://panel.bulleyetrade.com/api/mobile/forget-password',
        {email: values.email},
      );
      console.log('reccs', res);

      if (res.data.result === true) {
        const message = res.data.message;
        alert(message);
        navigation.navigate('ForgetPasswordOtp', {email: values.email}); // Pass email as a parameter
      }
    } catch (error) {
      if (error.response.data.message) {
        const validation = error.response.data.message;
        alert(validation);
      }
    }
  };

  // const handleChange = (name,text) => {
  //   setEmail(text);
  // };

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.mainBgColor,
        paddingHorizontal: responsiveWidth(5),
        paddingTop: responsiveHeight(7),
      }}>
      <View
        style={{
          marginVertical: responsiveHeight(2),
          display: 'flex',
          justifyContent: 'flex-start',
        }}>
        <View style={{marginVertical: responsiveHeight(5)}}>
          <Image
            source={require('../assets/Image/touch.png')}
            style={{width: responsiveWidth(10), height: responsiveHeight(5)}}
          />
        </View>

        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={emailOtpApi}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,

            isValid,
          }) => (
            <View>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: responsiveFontSize(2.2),
                  fontWeight: '600',
                }}>
                Forgot Password
              </Text>
              <Text style={{color: 'gray', marginTop: responsiveHeight(1.5)}}>
                No worries, we'll send you reset instructions.
              </Text>
              <TextInput
                placeholder="Email"
                placeholderTextColor="gray"
                style={{
                  width: responsiveWidth(80),
                  borderBottomColor: COLORS.TopBox,
                  borderBottomWidth: 1,
                  marginTop: responsiveHeight(1.5),
                  marginHorizontal: responsiveWidth(2),
                  fontSize: responsiveFontSize(2.2),
                  color: '#000',
                }}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              {touched.email && errors.email && (
                <Text style={{color: 'red'}}>{errors.email}</Text>
              )}

              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  backgroundColor: COLORS.TopBox,
                  padding: responsiveWidth(3),
                  borderRadius: responsiveWidth(1),
                  marginVertical: responsiveHeight(7),
                }}
                disabled={!isValid}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: responsiveFontSize(2.5),
                    color: '#fff',
                  }}>
                  Reset Password
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('login');
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: '500',
                    fontSize: responsiveFontSize(2.1),
                    color: '#000',
                  }}>
                  <Icon name="arrowleft" size={20} color="#000" /> Back to log
                  in
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
