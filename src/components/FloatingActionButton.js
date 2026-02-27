import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../hooks';

const FloatingActionButton = ({onPress, icon = 'add', style}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.fab,
        {backgroundColor: colors.primary, shadowColor: colors.primary},
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.85}>
      <MaterialIcons name={icon} size={28} color="#FFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default FloatingActionButton;
