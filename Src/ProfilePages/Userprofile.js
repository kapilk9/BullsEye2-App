import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SIZES, COLORS, icons, } from '../../constants';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { releaseSecureAccess } from 'react-native-document-picker';
import axios from 'axios';


// all pages responsive

const UserProfile = (onPress) => {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [fName, setFname] = useState('');
  const [lName, setlname] = useState('');
  const [bankData, setBankData] = useState('');
  const [accountname, setAccountName] = useState("");
  const [accountnumber, setAccountNumber] = useState('');
  const [bankaddress, setBankAddress] = useState('');

  const FetchBankDetails = async () => {
    try {
      const access_token = await AsyncStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${access_token}`,
      };

      const response = await axios.get(
        'https://scripts.bulleyetrade.com/api/bank_details',
        { headers },
      );
      setBankData(response.data.Data);
      console.log(response.data.Data)
    } catch (error) {
      console.log('error', error);
    }
  };




  const getStoredData = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('email');
      setEmail(storedEmail || '');
      const storeMobile = await AsyncStorage.getItem('mobile');
      setMobile(storeMobile || '');

      const first_name = await AsyncStorage.getItem('first_name');
      setFname(first_name || '')

      const last_name = await AsyncStorage.getItem('last_name');
      setlname(last_name || '')

      const storedbankname = await AsyncStorage.getItem('bank_name');
      setBankData(storedbankname || '');

      const storedAccountName = await AsyncStorage.getItem('account_name');
      setAccountName(storedAccountName || '');

      const storedAccountNumber = await AsyncStorage.getItem('account_number');
      setAccountNumber(storedAccountNumber || '');

      const storedBranchAddress = await AsyncStorage.getItem('branch_address');
      setBankAddress(storedBranchAddress || '');

      // Do something with the retrieved values (e.g., store them in component state)
      // ...
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getStoredData();
    FetchBankDetails();
  }, []);

  const SectionTitle = ({ title }) => {

    return (
      <View style={{ marginTop: responsiveHeight(3), marginLeft: responsiveWidth(2) }}>
        <Text style={{
          color: "#989FA5", fontSize: responsiveFontSize(2), fontWeight: '500'
        }}>{title}</Text>
      </View>
    )
  }


  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#E1D7E0', }}>
      <View style={{ paddingHorizontal: responsiveWidth(1), marginTop: responsiveHeight(2) }}>
        {/* <Text style={{ color: 'black', fontSize: responsiveFontSize(3.5), paddingLeft: responsiveWidth(3) }}>UserProfile</Text> */}

        <View style={{ backgroundColor: COLORS.mainBgColor, marginTop: responsiveHeight(2) }}>
          <View style={{
            height: responsiveWidth(20), backgroundColor: '#eeaeca', width: responsiveWidth(93),
            justifyContent: 'space-between',
            borderBottomWidth: 0.3, borderBottomColor: COLORS.lightGray3, alignSelf: 'center',
            alignItems: 'center',
            flexDirection: 'row', borderRadius: responsiveWidth(2)
          }}>
            <View>
              <Text style={{ fontSize: responsiveFontSize(3), marginLeft: responsiveWidth(4), color: '#000' }}>{fName + ' ' + lName}</Text>
              {/* <Text style={{ fontSize: responsiveFontSize(2), marginLeft: responsiveWidth(4), }}>kas25014</Text> */}

            </View>

            <View
              style={{
                width: responsiveWidth(10),
                height: responsiveWidth(10),
                // borderRadius: responsiveWidth(5),

                marginRight: responsiveWidth(10),
                
              }}>
              <Image
                source={icons.profile}
                style={{
                  width: responsiveWidth(10),
                  height: responsiveWidth(10),
                  borderWidth: 0.5,
                  borderColor: '#fff',
                  borderRadius: responsiveWidth(10),
                }}
              />
              {/* <View
                                style={{
                                    width: responsiveWidth(8),
                                    height: responsiveWidth(4),
                                    backgroundColor: 'red',
                                    position: 'absolute',
                                    right: responsiveWidth(-5),
                                    top: responsiveHeight(5),
                                    borderRadius: responsiveWidth(2),
                                }}>
                                <TouchableOpacity>
                                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.3), alignSelf: 'center' }}>
                                        Edit
                                    </Text>
                                </TouchableOpacity>
                            </View> */}
            </View>

          </View>

        </View>

        <View style={{
          flexDirection: 'row', justifyContent: 'space-between',
          paddingLeft: responsiveWidth(3), paddingRight: responsiveWidth(3), marginTop: responsiveHeight(4)
        }}>
          <SectionTitle title="Details" />

        </View>

        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(5),
          paddingLeft: responsiveWidth(5), paddingRight: responsiveWidth(5)
        }}>
          <Text style={{ fontSize: responsiveFontSize(2), color: '#000' }}>E-mail</Text>
          <Text style={{ fontSize: responsiveFontSize(2), color: '#989FA5' }}>{email}</Text>
        </View>
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', marginTop: 40,
          paddingLeft: 20, paddingRight: 20
        }}>
          <Text style={{ fontSize: responsiveFontSize(2), color: '#000' }}>Phone</Text>
          <Text style={{ fontSize: responsiveFontSize(2), color: '#989FA5' }}>{mobile}</Text>
        </View>

        <View style={{
          flexDirection: 'row', justifyContent: 'space-between',
          paddingLeft: responsiveWidth(3), paddingRight: responsiveWidth(3), marginTop: responsiveHeight(4)
        }}>
          <SectionTitle title="Bank Account Details" />

        </View>
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(5),
          paddingLeft: responsiveWidth(5), paddingRight: responsiveWidth(5)
        }}>
          <Text style={{ fontSize: responsiveFontSize(2), color: '#000' }}>Bank Name</Text>
          <Text style={{ fontSize: responsiveFontSize(2), color: '#989FA5' }}>{bankData}</Text>
        </View>
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', marginTop: 40,
          paddingLeft: 20, paddingRight: 20
        }}>
          <Text style={{ fontSize: responsiveFontSize(2), color: '#000' }}>Account Name</Text>
          <Text style={{ fontSize: responsiveFontSize(2), color: '#989FA5' }}>{accountname}</Text>
        </View>
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(5),
          paddingLeft: responsiveWidth(5), paddingRight: responsiveWidth(5)
        }}>
          <Text style={{ fontSize: responsiveFontSize(2), color: '#000' }}>Account Number</Text>
          <Text style={{ fontSize: responsiveFontSize(2), color: '#989FA5' }}>{accountnumber}</Text>
        </View>
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', marginTop: 40,
          paddingLeft: 20, paddingRight: 20
        }}>
          <Text style={{ fontSize: responsiveFontSize(2), color: '#000' }}>Branch Address</Text>
          <Text style={{ fontSize: responsiveFontSize(2), color: '#989FA5' }}>{bankaddress}</Text>
        </View>




      </View>
    </ScrollView>
  )

}

export default UserProfile;
