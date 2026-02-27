import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../hooks';
import {formatCurrencyShort} from '../utils/currency';
import {fonts} from '../constants/fonts';

const BarChart = ({data, height = 180}) => {
  const {colors} = useTheme();
  const maxAmount = Math.max(...data.map(d => d.amount), 1);

  return (
    <View style={[styles.container, {height}]}>
      <View style={styles.barsRow}>
        {data.map((item, index) => {
          const barHeight = Math.max((item.amount / maxAmount) * (height - 50), 4);
          return (
            <View key={index} style={styles.barColumn}>
              <Text
                style={[
                  styles.barValue,
                  {color: colors.textSecondary, fontFamily: fonts.medium},
                ]}>
                {item.amount > 0 ? formatCurrencyShort(item.amount) : ''}
              </Text>
              <View
                style={[
                  styles.barTrack,
                  {backgroundColor: colors.border, height: height - 50},
                ]}>
                <View
                  style={[
                    styles.barFill,
                    {
                      height: barHeight,
                      backgroundColor: item.color || colors.primary,
                    },
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.barLabel,
                  {color: colors.textSecondary, fontFamily: fonts.medium},
                ]}>
                {item.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingVertical: 8},
  barsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    flex: 1,
  },
  barColumn: {alignItems: 'center', flex: 1},
  barValue: {fontSize: 10, fontWeight: '500', marginBottom: 4},
  barTrack: {
    width: 28,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  barFill: {width: '100%', borderRadius: 8},
  barLabel: {fontSize: 10, marginTop: 6, fontWeight: '500'},
});

export default BarChart;
