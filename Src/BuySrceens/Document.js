import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import DocumentPicker from 'react-native-document-picker';
import { TextInput } from 'react-native-gesture-handler';
import { postData3 } from '../../constants/hooks/ApiHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
// import { useNavigation } from '@react-navigation/native';

//  All page responsive

const Document = ({ navigation }) => {
  // navigation=useNavigation();
  const [doc, setDoc] = useState();
  const [doc1, setDoc1] = useState();
  const [doc2, setDoc2] = useState();
  const [loading, setLoading] = useState(false);
  const [storeResponse, setStoreResponse] = useState('');

  // document selection here ------------------------------------
  const SelectDOC = async () => {
    try {
      const selectedDoc = await DocumentPicker.pickSingle();
      const imageData = {
        uri: selectedDoc.uri,
        type: selectedDoc.type,
        name: selectedDoc.name || 'image.jpg',
      };
      console.log('image data', imageData);
      setDoc(imageData);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        setDoc(null); // Reset the doc2 state if document selection is canceled
        console.log('User cancelled the upload');
      } else {
        setDoc('Error selecting document'); // Set an error message in doc2 state if there's an error
        console.log(err);
      }
    }
  };

  const SelectDOC1 = async () => {
    try {
      const selectedDoc = await DocumentPicker.pickSingle();
      const imageData = {
        uri: selectedDoc.uri,
        type: selectedDoc.type,
        name: selectedDoc.name || 'image.jpg',
      };
      console.log('image data', imageData);
      setDoc1(imageData);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        setDoc1(null); // Reset the doc2 state if document selection is canceled
        console.log('User cancelled the upload');
      } else {
        setDoc1('Error selecting document'); // Set an error message in doc2 state if there's an error
        console.log(err);
      }
    }
  };

  const SelectDOC2 = async () => {
    try {
      const selectedDoc = await DocumentPicker.pickSingle();
      const imageData = {
        uri: selectedDoc.uri,
        type: selectedDoc.type,
        name: selectedDoc.name || 'image.jpg',
      };
      console.log('image data', imageData);
      setDoc2(imageData);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        setDoc2(null); // Reset the doc2 state if document selection is canceled
        console.log('User cancelled the upload');
      } else {
        setDoc2('Error selecting document'); // Set an error message in doc2 state if there's an error
        console.log(err);
      }
    }
  };


  // document selection here end  ------------------------------------

  const handleDocInputChange = value => {
    setDoc(value);
  };

  const handleDoc1InputChange = value => {
    setDoc1(value);
  };

  const handleDoc2InputChange = value => {
    setDoc2(value);
  };

  // api call here ---------------------------------

  const handleDocumentSubmit = async () => {
    try {
      const id = await AsyncStorage.getItem('id');

      const formData = new FormData();
      formData.append('id', id);
      formData.append('aadharFront', {
        uri: doc.uri,
        name: 'aadharFront.jpg',
        type: doc.type,
      });
      formData.append('aadharBack', {
        uri: doc1.uri,
        name: 'aadharBack.jpg',
        type: doc1.type,
      });
      formData.append('panCard', {
        uri: doc2.uri,
        name: 'panCard.jpg',
        type: doc2.type,
      });

      console.log('payload', formData);
      setLoading(true);
      const response = await postData3(
        'https://panel.bulleyetrade.com/api/mobile/document-verify',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('dss', response.data.message);

      setTimeout(() => {
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: 'Document upload successful',
          visibilityTime: 2500, // Display toast for 1.5 seconds
          autoHide: true,
          onHide: () => {
            navigation.navigate('MainLayout');
          },
        });
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#d6e4f2' }}>
      {loading && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {!loading && (
        <View style={{ alignSelf: 'center' }}>
          <View style={{ marginTop: responsiveHeight(5), marginLeft: responsiveWidth(3) }}>
            <Text style={{ fontSize: responsiveFontSize(3.5), color: '#000' }}>
              Documents verification
            </Text>
          </View>
          <View style={{ marginLeft: responsiveWidth(3), marginTop: responsiveHeight(3) }}>
            <Text style={{ fontSize: responsiveFontSize(2.5), color: '#757575' }}>
              Aadhar image upload (Font side)
            </Text>
          </View>

          <View
            style={{
              width: responsiveWidth(90),
              height: responsiveHeight(8.5),
              borderRadius: responsiveWidth(3),
              borderWidth: 0.5,
              borderColor: '#757575',
              marginTop: responsiveHeight(2),
              marginLeft: responsiveWidth(3),
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={SelectDOC}>
              <View
                style={{
                  width: responsiveWidth(27),
                  height: responsiveWidth(14),
                  borderRadius: responsiveWidth(3),
                  borderWidth: 0.5,
                  borderColor: '#757575',
                  marginLeft: responsiveWidth(1.5),
                  marginTop: responsiveHeight(0.6),
                  backgroundColor: '#ACC8E5',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ color: '#000', fontSize: responsiveFontSize(2) }}>upload</Text>
              </View>
            </TouchableOpacity>
            <View style={{ paddingHorizontal: 10 }}>
              <TextInput
                value={doc ? doc.name : ''}
                onChangeText={handleDocInputChange}
                numberOfLines={2}
                maxLength={15}
                multiline={true}
                style={{ color: doc ? 'black' : 'red' }}
              />
            </View>
          </View>
          {!doc && (
            <Text style={{ fontSize: responsiveFontSize(1.6), color: 'red', margin: responsiveWidth(3) }}>
              {!doc
                ? 'Please select a document'
                : doc === 'User cancelled the upload'
                  ? 'User cancelled the upload'
                  : 'Error selecting document'}
            </Text>
          )}


          {/* copy above code */}

          <View style={{ marginLeft: responsiveWidth(3), marginTop: responsiveHeight(3) }}>
            <Text style={{ fontSize: responsiveFontSize(2.5), color: '#757575' }}>
              Aadhar image upload (Back side)
            </Text>
          </View>
          <View
            style={{
              width: responsiveWidth(90),
              height: responsiveHeight(8.5),
              borderRadius: responsiveWidth(3),
              borderWidth: 0.5,
              borderColor: '#757575',
              marginTop: responsiveHeight(2),
              marginLeft: responsiveWidth(3),
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={SelectDOC1}>
              <View
                style={{
                  width: responsiveWidth(27),
                  height: responsiveWidth(14),
                  borderRadius: responsiveWidth(3),
                  borderWidth: 0.5,
                  borderColor: '#757575',
                  marginLeft: responsiveWidth(1.5),
                  marginTop: responsiveHeight(0.6),
                  backgroundColor: '#ACC8E5',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ color: '#000', fontSize: responsiveFontSize(2) }}>upload</Text>
              </View>
            </TouchableOpacity>
            <View style={{ paddingHorizontal: 10 }}>
              <TextInput
                value={doc1 ? doc1.name : ''}
                onChangeText={handleDoc1InputChange}
                numberOfLines={4}
                maxLength={15}
                multiline={true}
                style={{ color: doc1 ? 'black' : 'red' }}
              />
            </View>
          </View>

          {!doc1 && (
            <Text style={{ fontSize: responsiveFontSize(1.6), color: 'red', margin: responsiveWidth(3) }}>
              {!doc1
                ? 'Please select a document'
                : doc1 === 'User cancelled the upload'
                  ? 'User cancelled the upload'
                  : 'Error selecting document'}
            </Text>
          )}


          <View style={{ marginLeft: responsiveWidth(3), marginTop: responsiveHeight(3) }}>
            <Text style={{ fontSize: responsiveFontSize(2.5), color: '#757575' }}>
              PanCard image upload (Font side)
            </Text>
          </View>
          <View
            style={{
              width: responsiveWidth(90),
              height: responsiveHeight(8.5),
              borderRadius: responsiveWidth(3),
              borderWidth: 0.5,
              borderColor: '#757575',
              marginTop: responsiveHeight(2),
              marginLeft: responsiveWidth(3),
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={SelectDOC2}>
              <View
                style={{
                  width: responsiveWidth(27),
                  height: responsiveWidth(14),
                  borderRadius: responsiveWidth(3),
                  borderWidth: 0.5,
                  borderColor: '#757575',
                  marginLeft: responsiveWidth(1.5),
                  marginTop: responsiveHeight(0.6),
                  backgroundColor: '#ACC8E5',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ color: '#000', fontSize: responsiveFontSize(2) }}>upload</Text>
              </View>
            </TouchableOpacity>
            <View style={{ paddingHorizontal: 10 }}>
              <TextInput
                value={doc2 ? doc2.name : ''}
                onChangeText={handleDoc1InputChange}
                numberOfLines={4}
                maxLength={15}
                multiline={true}
                style={{ color: doc2 ? 'black' : 'red' }}
              />
            </View>
          </View>

          {!doc2 && (
            <Text style={{ fontSize: responsiveFontSize(1.6), color: 'red', margin: responsiveWidth(3) }}>
              {!doc2
                ? 'Please select a document'
                : doc2 === 'User cancelled the upload'
                  ? 'User cancelled the upload'
                  : 'Error selecting document'}
            </Text>
          )}

          <TouchableOpacity onPress={handleDocumentSubmit}>
            <View
              style={{
                width: responsiveWidth(90),
                height: responsiveHeight(8),
                borderRadius: responsiveWidth(1.5),
                borderWidth: 0.5,
                borderColor: '#757575',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: responsiveHeight(4),
                alignSelf: 'center',
                backgroundColor: '#ACC8E5',
                marginLeft: responsiveWidth(3)
              }}>
              <Text style={{ fontSize: responsiveFontSize(2.2), color: '#000' }}>DOCUMENT SUBMIT</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Document;
