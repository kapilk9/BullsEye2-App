import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  header: '#2E538C',
  primary: '#ACC8E5',
  // primary: "#0047AB",
  secondary: '#3B3B3B',
  // secondary: "#A7C7E7",
  mainBgColor:'#E1D7E0',
  bgColor: '#eeaeca',
  textColor: '#000',
  TopBox:'#8aa0b7',
  BottomTab:'#1A6164',
  white: '#fff',
  lightGreen: '#4BEE70',
  red: '#D84035',
  black: '#000',
  // black: "#000080",

  gray: '#212125',
  // gray: "#0047AB",
  gray1: '#1f1f1f',
  lightGray: '#3B3B3B',
  lightGray2: '#212125',
  lightGray3: '#757575',
  transparentWhite: 'rgba(255, 255, 255, 0.2)',
  transparentBlack: 'rgba(0, 0, 0, 0.8)',
  transparentBlack1: 'rgba(0, 0, 0, 0.4)',
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};
export const sizes = {
  width,
  height,
  title: 32,
  h2: 24,
  h3: 18,
  body: 14,
  radius: 16,
};

export const spacing = {
  s: 8,
  m: 18,
  large: 24,
  xl: 40,
};
export const FONTS = {
  largeTitle: {fontFamily: 'Roboto-Black', fontSize: SIZES.largeTitle},
  h1: {fontFamily: 'Roboto-Black', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 22},
  h5: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h5, lineHeight: 22},
  body1: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body1, lineHeight: 36},
  body2: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body2, lineHeight: 30},
  body3: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body3, lineHeight: 22},
  body4: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body4, lineHeight: 22},
  body5: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body5, lineHeight: 22},
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
