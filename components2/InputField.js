import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

const InputField = ({
  label,
  icon,
  inputType,
  value,
  onChangeText,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  
}) => (
  <View
    style={{
      flexDirection: 'row',
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      paddingBottom: responsiveHeight(2),
      marginBottom: responsiveHeight(3),
    }}>
    {icon && <View style={{marginRight: responsiveWidth(2)}}>{icon}</View>}
    {inputType === 'password' ? (
      <TextInput
        placeholder={label}
        keyboardType={keyboardType}
        style={{flex: 1, paddingVertical: 0,color:'#000',fontSize:responsiveFontSize(1.7)}}
        secureTextEntry={true}
        placeholderTextColor="gray"
        value={value}
        onChangeText={onChangeText}
      />
    ) : (
      <TextInput
        placeholder={label}
        keyboardType={keyboardType}
        style={{flex: 1, paddingVertical: 0,color:'#000',fontSize:responsiveFontSize(1.7)}}
        placeholderTextColor="gray"
        value={value}
        onChangeText={onChangeText}
        autoCapitalize=''
      />
    )}
    {fieldButtonLabel && fieldButtonFunction && (
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: '#0D4E9A', fontWeight: '700'}}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    )}
  </View>
);

export default InputField;
