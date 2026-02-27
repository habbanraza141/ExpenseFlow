import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../hooks';
import {fonts} from '../constants/fonts';

const EmptyState = ({icon = 'receipt', message = 'Nothing here yet'}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <MaterialIcons
        name={icon}
        size={56}
        color={colors.textTertiary}
      />
      <Text style={[styles.text, {color: colors.textTertiary, fontFamily: fonts.medium}]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  text: {fontSize: 15, marginTop: 12, textAlign: 'center', paddingHorizontal: 40},
});

export default EmptyState;
