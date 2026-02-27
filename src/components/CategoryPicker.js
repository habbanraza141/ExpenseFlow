import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../hooks';
import CATEGORIES from '../constants/categories';
import {fonts} from '../constants/fonts';

const CategoryPicker = ({selected, onSelect, horizontal = false, showAll = false}) => {
  const {colors} = useTheme();

  const items = showAll
    ? [{id: 'all', name: 'All', icon: 'apps', color: colors.primary}, ...CATEGORIES]
    : CATEGORIES;

  if (horizontal) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hContainer}>
        {items.map(cat => {
          const active = selected === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.chip,
                {
                  backgroundColor: active ? cat.color + '20' : colors.surface,
                  borderColor: active ? cat.color : colors.border,
                },
              ]}
              onPress={() => onSelect(cat.id)}
              activeOpacity={0.7}>
              <MaterialIcons
                name={cat.icon}
                size={15}
                color={active ? cat.color : colors.textSecondary}
              />
              <Text
                style={[
                  styles.chipText,
                  {
                    color: active ? cat.color : colors.textSecondary,
                    fontFamily: fonts.medium,
                  },
                ]}>
                {cat.name.split('&')[0].trim()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }

  return (
    <View style={styles.grid}>
      {items.map(cat => {
        const active = selected === cat.id;
        return (
          <TouchableOpacity
            key={cat.id}
            style={styles.gridItem}
            onPress={() => onSelect(cat.id)}
            activeOpacity={0.7}>
            <View
              style={[
                styles.gridIcon,
                {
                  backgroundColor: active ? cat.color + '25' : colors.surfaceVariant,
                  borderWidth: active ? 2 : 0,
                  borderColor: cat.color,
                },
              ]}>
              <MaterialIcons
                name={cat.icon}
                size={22}
                color={cat.color}
              />
            </View>
            <Text
              style={[
                styles.gridLabel,
                {
                  color: active ? cat.color : colors.textSecondary,
                  fontFamily: active ? fonts.semiBold : fonts.regular,
                },
              ]}
              numberOfLines={1}>
              {cat.name.split('&')[0].trim()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  hContainer: {paddingVertical: 8},
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  chipText: {fontSize: 12, fontWeight: '500', marginLeft: 6},
  grid: {flexDirection: 'row', flexWrap: 'wrap'},
  gridItem: {width: '25%', alignItems: 'center', paddingVertical: 10},
  gridIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridLabel: {fontSize: 11, marginTop: 6, textAlign: 'center'},
});

export default CategoryPicker;
