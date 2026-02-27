import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../hooks';
import {fonts} from '../constants/fonts';

const InsightCard = ({insight}) => {
  const {colors} = useTheme();

  const typeConfig = {
    success: {bg: colors.successBg, icon: colors.success},
    warning: {bg: colors.warningBg, icon: colors.warning},
    info: {bg: colors.primaryBg, icon: colors.primary},
  };

  const config = typeConfig[insight.type] || typeConfig.info;

  return (
    <View style={[styles.card, {backgroundColor: config.bg}]}>
      <MaterialIcons
        name={insight.icon}
        size={20}
        color={config.icon}
        style={styles.icon}
      />
      <Text style={[styles.text, {color: colors.text, fontFamily: fonts.regular}]}>
        {insight.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
  },
  icon: {marginRight: 12},
  text: {flex: 1, fontSize: 13, lineHeight: 19},
});

export default InsightCard;
