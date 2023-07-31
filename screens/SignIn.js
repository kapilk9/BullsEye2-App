import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Alert, Text,Image, ScrollView,
    KeyboardAvoidingView,} from 'react-native';
import {Card} from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Button, } from '@rneui/themed';
import LoginImg from '../assets/Image/LoginBg.jpg'
import Lottie from 'lottie-react-native';
// import * as SecureStore from 'expo-secure-store';

const SignInScreen = props => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState([]);
  // const saveItem = async (item, selectedValue) => {
  //     try {
  //         await AsyncStorage.setItem(item, JSON.stringify(selectedValue));
  //          await AsyncStorage.setItemAsync(item, JSON.stringify(selectedValue));
  //         props.navigation.navigate('App');
  //     } catch (error) {
  //         console.error('AsyncStorage error: ' + error.message);
  //     }
  // }
  const login = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        axios
          .post('https://srninfotech.com/projects/ekonnet/backend/api/login', {
            email: email,
            password: password,
          })
          .then(async res => {
            try {
              if (res.data.result) {
                await AsyncStorage.setItem(
                  'bearerToken',
                  res.data.access_token,
                );
                Toast.show({
                  type: 'success',
                  text1: 'Login Successful',
                  text2: 'Welcome To Ekonnet !',
                  duration: 2000,
                });
                navigation.replace('MainLayout');
              } else {
                createTwoButtonAlert('Invalid Credentials', 'Oops!');
              }
            } catch (e) {
              console.log(e);
            }
          })
          .catch(function (error) {
            if (error.response) {
              let payload = error.response.data.payload;
              let errorData = [];
              Object.keys(payload).map(function (keyName, keyIndex) {
                createTwoButtonAlert(payload[keyName][0], 'Oops!');
              });
            } else {
              console.log('Error', error.message);
            }
          });
      } else {
        createTwoButtonAlert('Invalid Credentials', 'Oops');
      }
    } catch (error) {
      alert(error);
    }
  };
  const createTwoButtonAlert = (message, title) =>
    Alert.alert(
      title,
      message,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  return (
    <View style={styles.screen}>
<ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
      {/* <Text style={styles.logoText}>Ekonnet</Text> */}
      <View style={styles.contentContainer}>
      <Lottie style={{width:300,height:300}} source={require('../assets/93385-login.json')} autoPlay loop  />
      
    
    
      <Card
        title={'Sign In'}
        containerStyle={{flex:1, padding: 0,backgroundColor:'#A7C7E7', width: '100%', borderTopLeftRadius: 40, borderTopRightRadius: 40}}>
        <Card.Title style={styles.cartTitle}>
          <Text style={styles.textContent}>Sign In</Text>
        </Card.Title>

        {/* <Card.Divider></Card.Divider> */}
        <View style={{width: '90%', paddingLeft: '5%', paddingBottom: 10}}>
          <TextInput
            placeholder={'email'}
            style={styles.input}
            value={email}
            onChangeText={email => setEmail(email)}
          />
          <TextInput
            placeholder={'Password'}
            secureTextEntry={true}
            style={styles.input}
            value={password}
            onChangeText={password => setPassword(password)}
          />

          <Button
           title={'Sign In'} style={styles.input} onPress={login}
            buttonStyle={{
              backgroundColor: 'rgba(78, 116, 289, 1)',
              borderRadius: 5,
            }}
            containerStyle={{
            //   width: 200,
            //   marginHorizontal: 50,
            //   marginVertical: 10,
            }}
          />

          {/* <Button title={'Sign In'} style={styles.input} onPress={login} /> */}
          {errorMessage ? (
            Object.keys(errorMessage).map(errors => {
              {
                errorMessage[errors];
              }
            })
          ) : (
            <Text></Text>
          )}
        </View>
    
        <Text style={styles.textContent}>
      Don't have an account?{' '}
      <Text style={styles.signUpText}>Sign up</Text>
    </Text>

      </Card>
      </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#000080',
      },
      scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
      },
      contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      cardContainer: {
        flex: 1,
        padding: 0,
        backgroundColor: '#A7C7E7',
        width: '100%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
      },
      cardTitle: {
        paddingTop: 30,
        color: 'blue',
      },

//   screen: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#000080',
//   },
  input: {
    width: '100%',
    height: 44,
    padding: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
  },
  textContent: {
    marginTop: 15,
    fontSize:16,
    fontWeight:'700'
  },
  cartTitle: {
    paddingTop: 30,
    color:'blue',
  },
  innerCard: {
    padding: 10,
  },
  logoText: {
    fontSize: 40,
  },
  errorMessage: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderColor: '#f5c6cb',
  },
  textContent: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  signUpText: {
    color: 'blue',
    textDecorationLine: 'none',
    fontWeight: 'bold',
  },
  
});

export default SignInScreen;
