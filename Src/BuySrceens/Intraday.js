import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { COLORS, icons } from '../../constants'
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, } from 'react-native-reanimated';

const Intraday = () => {
  const [text, setText] = useState('');
  const [textT, setTextT] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const [isPressed1, setIsPressed1] = useState(false);
  const [isPressed2, setIsPressed2] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);

  
  const handleButtonPress = (buttonId) => {
    setSelectedButton(buttonId);
  };

  const handlePress = () => {
    setIsPressed1(!isPressed1);
  };
  const handlePress2 = () => {
    setIsPressed2(!isPressed2);
  };


  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };



  const handleTextChange = (inputText) => {
    // Remove any non-numeric characters from the input
    const numericValue = inputText.replace(/[^0-9]/g, '');
    setText(numericValue);
  };
  const handleTextChange1 = (inputText) => {
    // Remove any non-numeric and non-decimal characters from the input
    const numericValue = inputText.replace(/[^0-9.]/g, '');

    // Restrict to 6 digits before the decimal point
    const maxLength = 10; // 6 digits + 1 decimal point
    if (numericValue.length > maxLength) {
      return;
    }

    // Restrict to 2 decimal places
    const decimalParts = numericValue.split('.');
    if (decimalParts[1] && decimalParts[1].length > 2) {
      return;
    }

    setTextT(numericValue);
  };
  const renderButton = (buttonId, buttonColor, title) => (
    <TouchableHighlight
      key={buttonId}
      style={[styles.button, {
        backgroundColor: selectedButton === buttonId ? 'green' : buttonColor,

      }]}
      underlayColor="yellow"
      onPress={() => handleButtonPress(buttonId)}
    >
      <View>
        <Text style={{ color: selectedButton === buttonId ? 'white' : 'black' }} >{title}</Text>
      </View>
    </TouchableHighlight>
  );
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.mainBgColor }}>
      <View style={{ flexDirection: "row", justifyContent: 'space-around', marginTop: 20, marginLeft: 10 }} >
        <View style={{}}>
          <Text>Quantity</Text>

          <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[
              { borderColor: isPressed ? COLORS.lightGray3 : COLORS.lightGreen },
            ]}
          >
            <View style={{
              width: 160, height: 60, borderColor: COLORS.lightGray3, borderWidth: 0.5, borderRadius: 10,
              marginTop: 10,
            }}>
              <TextInput style={{ fontSize: 18, marginLeft: 5 }} value={text}
                onChangeText={handleTextChange}
                keyboardType="numeric"
                maxLength={7}  >
              </TextInput>
              <View style={{ marginLeft: 105, marginTop: -35 }}>
                <Text style={{ fontSize: 18 }}>Share</Text>
              </View>

            </View>
          </TouchableOpacity>

        </View>
        <View style={{}}>
          <Text style={{ marginLeft: 10 }}>Buying Price</Text>
          <View style={{
            width: 160, height: 60, borderColor: COLORS.lightGray3, borderWidth: 0.5, borderRadius: 10,
            margin: 10,
          }}>
            <TextInput style={{ fontSize: 18, marginLeft: 5 }}
              value={textT}
              onChangeText={handleTextChange1}
              keyboardType="numeric" // Set the keyboard type to numeric

            />
            <TouchableOpacity>
              <View style={{ marginLeft: 130, marginTop: -35 }}>
                <Image source={icons.licenses} style={{ width: 25, height: 25 }} />
              </View>
            </TouchableOpacity>

          </View>
        </View >
      </View>
      <View style={{ borderBottomColor: "#BBC7CF", borderBottomWidth: 0.5, marginTop: 20 }}></View>
      <View style={{ marginLeft: 10, marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: '800', color: '#000' }}>Order type</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>

        <View style={styles.container}>
          {renderButton(1, 'white', title = "Limit")}
          <View style={{ marginLeft: 20 }}>
            {renderButton(2, 'white', title = "Market")}
          </View>
          <View style={{ marginLeft: 20 }}>
            {renderButton(3, 'white', title = "SL-LMT")}
          </View>
          <View style={{ marginLeft: 20 }}>
            {renderButton(4, 'white', title = "SL-MKT")}
          </View>

        </View>

      </View>
      <View style={{ marginLeft: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ marginTop: 20, }}>
          <Text style={{ fontSize: 15 }}>Stoploss trigger</Text>
        </View>
        <View style={{
          width: 160, height: 60, borderColor: COLORS.lightGray3, borderWidth: 0.5, borderRadius: 10,
          margin: 10,
        }}>
          <TextInput style={{ fontSize: 18, marginLeft: 5 }}
            value={textT}
            onChangeText={handleTextChange1}
            keyboardType="numeric" // Set the keyboard type to numeric

          />

        </View>
      </View>
      <View style={{ borderBottomColor: "#BBC7CF", borderBottomWidth: 0.5, marginTop: 10 }}></View>

      <View style={{ marginLeft: 10, marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: '800', color: '#000' }}>Product tpye</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>

        <View style={{ width: 70, height: 70, marginLeft: 20, marginTop: 20 }}>
          {renderButton(5, '#E2E6E9', title = "NRML")}

        </View>

      </View>
      <View>
        <View style={{ width: 80, height: 70, marginLeft: 20, marginTop: -10 }}>
          {renderButton(6, 'green', title = "Add Cash")}


        </View>

      </View>
      <View style={{ borderBottomColor: "#BBC7CF", borderBottomWidth: 0.5, marginTop: -10 }}></View>


      <TouchableOpacity>
        <View style={{
          width: 300, height: 60, backgroundColor: 'green', marginTop: 40, paddingLeft: 10, paddingRight: 10,
          justifyContent: 'center', borderRadius: 15, alignSelf: 'center', alignItems: 'center',
        }}>

          <Text style={{fontSize:20,color:'white'}}>Buy</Text>

        </View>
      </TouchableOpacity>
    </View >



  )

}
export default Intraday;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20, marginTop: 20,
    flexDirection: 'row',

  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,

  },
});