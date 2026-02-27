import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../hooks';
import {fonts} from '../constants/fonts';

const TextInputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  autoCorrect,
  multiline,
  numberOfLines,
  leftIcon,
  style,
  inputStyle,
}) => {
  const {colors} = useTheme();
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const borderColor = error
    ? colors.danger
    : focused
    ? colors.primary
    : colors.border;

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, {color: colors.textSecondary, fontFamily: fonts.medium}]}>
          {label}
        </Text>
      )}
      <View
        style={[styles.inputRow, {borderColor, backgroundColor: colors.surface}]}>
        {leftIcon && (
          <MaterialIcons
            name={leftIcon}
            size={20}
            color={colors.textTertiary}
            style={styles.leftIcon}
          />
        )}
        <TextInput
          style={[
            styles.input,
            {color: colors.text, fontFamily: fonts.regular},
            multiline && styles.multiline,
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeBtn}>
            <MaterialIcons
              name={showPassword ? 'visibility-off' : 'visibility'}
              size={20}
              color={colors.textTertiary}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={[styles.error, {color: colors.danger}]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginBottom: 16},
  label: {fontSize: 13, fontWeight: '500', marginBottom: 8},
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    minHeight: 50,
  },
  leftIcon: {marginRight: 10},
  input: {flex: 1, fontSize: 15, paddingVertical: 12},
  multiline: {minHeight: 80, textAlignVertical: 'top'},
  eyeBtn: {padding: 4},
  error: {fontSize: 12, marginTop: 4, marginLeft: 4},
});

export default TextInputField;
