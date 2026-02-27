import {Platform} from 'react-native';

const isIOS = Platform.OS === 'ios';

export const fonts = {
  regular: isIOS ? 'Poppins-Regular' : 'Poppins-Regular',
  medium: isIOS ? 'Poppins-Medium' : 'Poppins-Medium',
  semiBold: isIOS ? 'Poppins-SemiBold' : 'Poppins-SemiBold',
  bold: isIOS ? 'Poppins-Bold' : 'Poppins-Bold',
};

export const fontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 24,
  xxxl: 32,
  display: 40,
};
