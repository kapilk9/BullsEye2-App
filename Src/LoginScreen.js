import React,{useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation,useIsFocused  } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Lottie from 'lottie-react-native';
import { postData } from '../constants/hooks/ApiHelper';
import { COLORS } from '../constants';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import CustomButton from '../components2/CustomButton';
import InputField from '../components2/InputField';
import { getToken,checkToken,setToken } from './TokenHooks';
import { TokenConstant } from './TokenConstant';
const baseUrl = 'https://scripts.bulleyetrade.com/api/signin';
const LoginScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const checkLoggedInStatus = async () => {
    const isLogged = await checkToken(TokenConstant.IS_LOGGED);
    if (isLogged) {
      navigation.replace('MainLayout'); // Redirect the user to the MainLayout if already logged in
    }else {
      navigation.replace('Login');
    }
  };

  
  // useEffect(()=>{
  //   checkLoggedInStatus();
  // },[])


  
  // useEffect(() => {
  //   const checkStatus = async () => {
  //     // Wait for the checkLoggedInStatus function to finish before navigating
  //     await checkLoggedInStatus();

  //     // If the screen is still focused, navigate to the login screen
  //     if (isFocused) {
  //       navigation.replace('Login');
  //     }
  //   };

  //   checkStatus();
  // }, [isFocused]);
  // const fetch = async () => {
  //   const id = await AsyncStorage.getItem('accessToken');
  //   if (id.length > 0) {
  //   } else {
  //     navigation.replace('Login');
  //   }
  // };

  // useEffect(() => {
  //   fetch(); 
  //   checkLoggedInStatus();
  // }, []);


  const login = async (values) => {
    const { email, password } = values;

    const payload = {
      email: email,
      password: password,
    };

    try {
      const res = await postData(baseUrl, payload);
      const accessToken = res.data.payload.access_token;
      const id = res.data.payload.id;
      const email = res.data.payload.email;
      const mobile = res.data.payload.mobile;
      const first_name = res.data.payload.first_name;
      const last_name = res.data.payload.last_name;
      const user_balance = res.data.payload.user_balance;
      const bank_name = res.data.payload.bank_name;
      const account_name = res.data.payload.account_name;
      const account_number = res.data.payload.account_number;
      const branch_address = res.data.payload.branch_address;

      await AsyncStorage.setItem('accessToken', accessToken.toString());
      await AsyncStorage.setItem('id', id.toString());
      await AsyncStorage.setItem('email', email.toString());
      await AsyncStorage.setItem('mobile', mobile.toString());
      await AsyncStorage.setItem('first_name', first_name.toString());
      await AsyncStorage.setItem('last_name', last_name.toString());
      await AsyncStorage.setItem('user_balance',user_balance.toString());
      await AsyncStorage.setItem('bank_name',bank_name.toString());
      await AsyncStorage.setItem('account_name',account_name.toString());
      await AsyncStorage.setItem('account_number',account_number.toString());
      await AsyncStorage.setItem('branch_address',branch_address.toString());
      console.log('das',res)
      const { status, payload: responseData } = res.data;
      if (status === 200) {
        await setToken(TokenConstant.IS_LOGGED, 'True');
        const { email_verified_at, mobile_verified_at, aadhar_verified_at } =
          responseData;

        // Check email verification
        if (email_verified_at === null) {
          navigation.navigate('email', { email: email });
          return;
        }

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
    } catch (error) {
      // console.log(error.response.data.errors)
      if (error.response && error.response.data && error.response.data.errors) {
        // The server returned validation errors
        const validationErrors = error.response.data.errors;
  
        // Handle the validation errors and show them to the user
        console.log('Validation Errors:', validationErrors);
        alert('Validation errors occurred.');
      } else {
        // Handle other types of errors
        console.log('Error:', error);
        alert('An error occurred during the API call.');
      }
    }
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
    // .matches(
    //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    //   'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
    // ),
  });

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      // onSubmit={(values) => login(values)
      // }
      onSubmit={async (values) => {
        await login(values);
        await setToken(TokenConstant.IS_LOGGED, 'True');
      }}
      
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid }) => (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: COLORS.mainBgColor }}>
          <View style={{ paddingHorizontal: 25 }}>
            <View style={{ alignItems: 'center' }}>
              <Lottie
                source={require('../assets/loginlogo.json')}
                autoPlay
                loop
                style={{ width: responsiveWidth(30), height: responsiveWidth(30) }}
              />
            </View>

            <Text style={{
              fontFamily: 'Roboto-Medium',
              fontSize: responsiveFontSize(3.5),
              fontWeight: '600',
              color: '#333',
              marginBottom: responsiveHeight(3),
              marginTop: responsiveHeight(2),
            }}>
              Login
            </Text>

            <InputField
              label={'Email ID'}
              placeholderTextColor="#000"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email && errors.email}
              icon={
                <MaterialIcons
                  name="alternate-email"
                  size={responsiveFontSize(3)}
                  color="#666"
                  style={{ marginRight: responsiveWidth(2) }}
                />
              }
              inputStyle={{ color: 'blue' }}
              keyboardType="email-address"
            />
            {touched.email && errors.email && (
              <Text style={{ color: 'red', marginBottom: responsiveHeight(5), paddingLeft: responsiveWidth(5), paddingBottom: responsiveHeight(1),fontSize:responsiveFontSize(1.5) }}>
                {errors.email}
              </Text>
            )}

            <InputField
              label={'Password'}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={touched.password && errors.password}
              icon={
                <Ionicons
                  name="ios-lock-closed-outline"
                  size={responsiveFontSize(3)}
                  color="#666"
                  style={{ marginRight: responsiveWidth(2) }}
                />
              }
              inputType="password"
              // fieldButtonLabel={'Forgot?'}
              fieldButtonFunction={() => { }}
            />
            {touched.password && errors.password && (
              <Text style={{ color: 'red', marginBottom: responsiveHeight(5), paddingLeft: responsiveWidth(5), paddingBottom: responsiveHeight(1),fontSize:responsiveFontSize(1.5) }}>
                {errors.password}
              </Text>
            )}

            <CustomButton label={'Login'} onPress={handleSubmit} />

            <TouchableOpacity style={{display:'flex',justifyContent:'center',alignItems:'center',marginVertical:responsiveHeight(2)}} onPress={()=>{navigation.navigate('ForgotPassword')}}>
              <Text style={{fontSize:responsiveFontSize(2),fontWeight:'600',color:'#000'}}>Forgot Password?</Text>
            </TouchableOpacity>


            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: responsiveHeight(3) }}>
              <Text style={{ color: COLORS.textColor,fontSize:responsiveFontSize(1.7) }}>New to the app?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={{ color: '#f6b248', fontWeight: '700',fontSize:responsiveFontSize(1.7) }}> Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default LoginScreen;
