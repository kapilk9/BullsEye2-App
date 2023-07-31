import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const OtpLibrary = ({ value, valueLength, onChange }) => {
  const renderInput = (digit, idx) => (
    <TextInput
      key={idx}
      type="text"
      inputMode="numeric"
      autoComplete="one-time-code"
      pattern="\d{1}"
      maxLength={valueLength}
      value={digit}
      onChange={(e) => onChange(e.target.value)}
      style={styles.input}
    />
  );

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5, 6].map(renderInput)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  input: {
    width: '33%',
    textAlign: 'center',
  },
});

export default OtpLibrary;