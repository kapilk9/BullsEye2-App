import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import DatePicker from 'react-native-date-picker';
import Lottie from 'lottie-react-native';

import InputField from '../components2/InputField';
import { Formik } from 'formik';
import * as Yup from 'yup';


import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components2/CustomButton';
import { COLORS } from '../constants';
// import { postData } from '../constants/hooks/ApiHelper';
import { useNavigation } from '@react-navigation/native';
import { postData2 } from '../constants/hooks/ApiHelper';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

// this screen are responsive

const baseUrl = "https://scripts.bulleyetrade.com/api/signup";

const RegisterScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dobLabel, setDobLabel] = useState('Date of Birth');
  const [errors, setErrors] = useState('')



  const UserRegister = async () => {
    ;
    const payload = {
      txtFirstName,
      txtLastName,
      txtMobile,
      email,
      password,
      confirm_password,
      walletPin,
    };
    // console.log("payload", payload);
    try {
      const res = await postData2(baseUrl, payload)
      if (SignupSchema()) {
        // console.log(UserRegister)
      }
      if (res.data.status == 201) {
        navigation.navigate("Login")
      }



    } catch (error) {
      console.error(error);

    }
  }

  const SignupSchema = Yup.object().shape({

    txtFirstName: Yup.string()
      .min(4, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please enter your first name'),
    txtLastName: Yup.string()
      .min(4, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please enter your last name'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    txtMobile: Yup.string()
      .min(10, 'Must be Exactly 10 digit')
      .max(10, 'Must be Exactly 10 digit')
      .required('Please enter your Mobile'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirm_password: Yup.string()
      .min(8, "Confirm Passward must be 8 characters long")
      .oneOf([Yup.ref('password')], "Your Passward do not match.")
      .required("Confirm passward is required"),
    walletPin: Yup.string()
      .min(4, "please enter at least 4 digit pin")
      .max(6)
      .required('please enter Valid pin')
  });


  return (
    <Formik initialValues={{
      txtFirstName: '',
      txtLastName: '',
      txtMobile: '',
      email: '',
      password: '',
      confirm_password: '',
      walletPin: '',
    }}
      validationSchema={SignupSchema}
      onSubmit={UserRegister}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid }) => (


        <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: COLORS.mainBgColor, }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ paddingHorizontal: responsiveWidth(5) }}>
            <View style={{ alignItems: 'center' }}>
              <Lottie source={require('../assets/register.json')} autoPlay loop style={{ width: responsiveWidth(35), height: responsiveWidth(35) }} />
            </View>

            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: responsiveFontSize(3),
                fontWeight: '500',
                color: '#333',
                marginBottom: responsiveHeight(2),
              }}>
              Register
            </Text>



            <InputField
              label={'First Name'}
              // value={txtFirstName}
              // onChangeText={(value) => handleInputChange('txtFirstName', value)}
              value={values.txtFirstName}
              onChangeText={handleChange("txtFirstName")}
              onBlur={handleBlur('txtFirstName')}
              error={touched.txtFirstName && errors.txtFirstName}

              icon={
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="#666"
                  style={{ marginRight: responsiveWidth(1) }}
                />
              }
            />
            {errors.txtFirstName && (
              <Text style={{
                color: 'red', marginBottom: responsiveHeight(5), paddingLeft: responsiveWidth(5),
                paddingBottom: responsiveHeight(1)
              }}>
                {errors.txtFirstName}
              </Text>
            )}

            <InputField
              label={'Last Name'}
              // value={txtLastName}
              // onChangeText={(value) => handleInputChange('txtLastName', value)}
              value={values.txtLastName}
              onChangeText={handleChange('txtLastName')}
              onBlur={handleBlur('txtLastName')}
              error={touched.txtLastName && errors.txtLastName}


              icon={
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="#666"
                  style={{ marginRight: responsiveWidth(1) }}
                />
              }
            />
            {errors.txtLastName && (
              <Text style={{
                color: 'red', marginBottom: responsiveHeight(5), paddingLeft: responsiveWidth(5),
                paddingBottom: responsiveHeight(1)
              }}>
                {errors.txtLastName}
              </Text>
            )}
            <InputField
              label={'Mobile Number'}
              // value={txtMobile}
              // onChangeText={(value) => handleInputChange('txtMobile', value)}
              value={values.txtMobile}
              onChangeText={handleChange("txtMobile")}
              onBlur={handleBlur('txtMobile')}
              error={touched.txtMobile && errors.txtMobile}


              icon={
                <FontAwesome5
                  name="mobile-alt"
                  size={20}
                  color="#666"
                  style={{ marginRight: responsiveWidth(3) }}
                />
              }
            />
            {errors.txtMobile && (
              <Text style={{
                color: 'red', marginBottom: responsiveHeight(5), paddingLeft: responsiveWidth(5),
                paddingBottom: responsiveHeight(1)
              }}>
                {errors.txtMobile}
              </Text>
            )}




            <InputField
              label={'Email ID'}
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur('email')}
              error={touched.email && errors.email}
              autoCapitaliz={false}


              // value={email}
              // onChangeText={(value) => handleInputChange('email', value)}
              icon={
                <MaterialIcons
                  name="alternate-email"
                  size={20}
                  color="#666"
                  style={{ marginRight: responsiveWidth(1) }}
                />
              }
            // error={errors.email}
            // keyboardType="email-address"
            />
            {errors.email && (
              <Text style={{ color: 'red', marginBottom: responsiveHeight(5), paddingLeft: responsiveWidth(5), paddingBottom: responsiveHeight(1) }}>
                {errors.email}
              </Text>
            )}

            <InputField
              label={'Password'}
              // value={password}
              // onChangeText={(value) => handleInputChange('password', value)}
              value={values.password}

              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={touched.password && errors.password}



              icon={
                <Ionicons
                  name="ios-lock-closed-outline"
                  size={20}
                  color="#666"
                  style={{ marginRight: responsiveWidth(1) }}
                />
              }
              // error={errors.password}
              inputType="password"
            />
            {errors.password && (
              <Text style={{ color: 'red', marginBottom: responsiveHeight(5), paddingLeft: responsiveWidth(5), paddingBottom: responsiveHeight(1) }}>
                {errors.password}
              </Text>
            )}


            <InputField
              label={'Confirm Password'}
              // value={confirm_password}
              // onChangeText={(value) => handleInputChange('confirm_password', value)}
              value={values.confirm_password}
              onChangeText={handleChange("confirm_password")}
              onBlur={handleBlur("confirm_password")}
              error={touched.confirm_password && errors.confirm_password}
              icon={
                <Ionicons
                  name="ios-lock-closed-outline"
                  size={20}
                  color="#666"
                  style={{ marginRight: responsiveWidth(1) }}
                />
              }
              // error={errors.confirm_password}
              inputType="password"
            />
            {errors.password && (
              <Text style={{ color: 'red', marginBottom: responsiveHeight(5), paddingLeft: responsiveWidth(5), paddingBottom: responsiveHeight(1) }}>
                {errors.password}
              </Text>
            )}
            <InputField
              label={'wallet Pin'}
              // value={walletPin}
              // onChangeText={(value) => handleInputChange('walletPin', value)}
              value={values.walletPin}
              onChangeText={handleChange("walletPin")}
              onBlur={handleBlur("walletPin")}
              error={touched.walletPin && errors.walletPin}

              icon={
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="#666"
                  style={{ marginRight: responsiveWidth(1) }}
                />
              }

            />
            {errors.walletPin && (
              <Text style={{ color: 'red', marginBottom: responsiveHeight(5), paddingLeft: responsiveWidth(5), paddingBottom: responsiveHeight(1) }}>
                {errors.walletPin}
              </Text>
            )}
            <CustomButton label={'Register'} onPress={handleSubmit} />
            {/* yaha per onpress per userRegistion ki value ko handle karna hai
            like this
                     onpress ={UserRegister} */}


            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: responsiveHeight(2),
              }}>
              <Text style={{ color: '#000' }}>Already registered?</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: '#f6b248', fontWeight: '700' }}> Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default RegisterScreen;
