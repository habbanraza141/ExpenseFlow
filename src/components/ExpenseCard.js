import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../hooks';
import {getCategoryById} from '../constants/categories';
import {formatCurrency} from '../utils/currency';
import {formatDate} from '../utils/dateUtils';
import {fonts} from '../constants/fonts';

const ExpenseCard = ({expense, onPress, onLongPress}) => {
  const {colors} = useTheme();
  const category = getCategoryById(expense.category);

  return (
    <TouchableOpacity
      style={[styles.card, {backgroundColor: colors.surface}]}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}>
      <View style={[styles.iconWrap, {backgroundColor: category.color + '18'}]}>
        <MaterialIcons
          name={category.icon}
          size={22}
          color={category.color}
        />
      </View>
      <View style={styles.info}>
        <Text
          style={[styles.title, {color: colors.text, fontFamily: fonts.semiBold}]}
          numberOfLines={1}>
          {expense.title}
        </Text>
        <Text
          style={[styles.subtitle, {color: colors.textSecondary, fontFamily: fonts.regular}]}>
          {category.name} · {formatDate(expense.date)}
        </Text>
      </View>
      <Text style={[styles.amount, {color: colors.danger, fontFamily: fonts.bold}]}>
        -{formatCurrency(expense.amount)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {flex: 1, marginLeft: 12},
  title: {fontSize: 15, fontWeight: '600', marginBottom: 2},
  subtitle: {fontSize: 12},
  amount: {fontSize: 15, fontWeight: '700'},
});

export default ExpenseCard;
