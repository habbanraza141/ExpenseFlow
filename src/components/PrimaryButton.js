import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useTheme} from '../hooks';
import {fonts} from '../constants/fonts';

const PrimaryButton = ({
  title,
  onPress,
  variant = 'filled',
  loading,
  disabled,
  style,
}) => {
  const {colors} = useTheme();

  const isFilled = variant === 'filled';
  const isDanger = variant === 'danger';
  const isOutline = variant === 'outline';

  const bgColor = isDanger
    ? colors.danger
    : isFilled
    ? colors.primary
    : 'transparent';
  const textColor = isFilled || isDanger ? '#FFFFFF' : colors.primary;
  const borderColor = isOutline ? colors.primary : isDanger ? colors.danger : 'transparent';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor: bgColor, borderColor},
        isOutline && styles.outline,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, {color: textColor, fontFamily: fonts.semiBold}]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  outline: {borderWidth: 1.5},
  text: {fontSize: 16, fontWeight: '600'},
  disabled: {opacity: 0.6},
});

export default PrimaryButton;
