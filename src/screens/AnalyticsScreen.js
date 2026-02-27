import React, {useMemo, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ScreenWrapper, BarChart, StackedBar, InsightCard} from '../components';
import {useTheme, useAppSelector} from '../hooks';
import {formatCurrency} from '../utils/currency';
import {getMonthName} from '../utils/dateUtils';
import {
  getMonthlyExpenses,
  getTotalSpent,
  getCategoryBreakdown,
  getWeeklyBreakdown,
  generateInsights,
} from '../utils/analytics';
import {fonts} from '../constants/fonts';

const AnalyticsScreen = () => {
  const {colors} = useTheme();
  const expenses = useAppSelector(s => s.expenses.expenses);

  const now = new Date();
  const [selMonth, setSelMonth] = useState(now.getMonth());
  const [selYear, setSelYear] = useState(now.getFullYear());

  const prevMonth = selMonth === 0 ? 11 : selMonth - 1;
  const prevYear = selMonth === 0 ? selYear - 1 : selYear;

  const monthExpenses = useMemo(
    () => getMonthlyExpenses(expenses, selMonth, selYear),
    [expenses, selMonth, selYear],
  );
  const prevMonthExpenses = useMemo(
    () => getMonthlyExpenses(expenses, prevMonth, prevYear),
    [expenses, prevMonth, prevYear],
  );

  const total = useMemo(() => getTotalSpent(monthExpenses), [monthExpenses]);
  const prevTotal = useMemo(() => getTotalSpent(prevMonthExpenses), [prevMonthExpenses]);
  const breakdown = useMemo(() => getCategoryBreakdown(monthExpenses), [monthExpenses]);
  const weekly = useMemo(() => getWeeklyBreakdown(monthExpenses), [monthExpenses]);
  const insights = useMemo(
    () => generateInsights(monthExpenses, prevMonthExpenses),
    [monthExpenses, prevMonthExpenses],
  );

  const changePercent = prevTotal > 0 ? ((total - prevTotal) / prevTotal) * 100 : 0;

  const goBack = () => {
    if (selMonth === 0) {
      setSelMonth(11);
      setSelYear(y => y - 1);
    } else {
      setSelMonth(m => m - 1);
    }
  };

  const goForward = () => {
    const n = new Date();
    if (selMonth === n.getMonth() && selYear === n.getFullYear()) return;
    if (selMonth === 11) {
      setSelMonth(0);
      setSelYear(y => y + 1);
    } else {
      setSelMonth(m => m + 1);
    }
  };

  return (
    <ScreenWrapper scrollable>
      <Text style={[styles.pageTitle, {color: colors.text, fontFamily: fonts.bold}]}>
        Analytics
      </Text>

      <View style={styles.monthNav}>
        <TouchableOpacity onPress={goBack} style={styles.navBtn}>
          <MaterialIcons name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.monthLabel, {color: colors.text, fontFamily: fonts.semiBold}]}>
          {getMonthName(selMonth)} {selYear}
        </Text>
        <TouchableOpacity onPress={goForward} style={styles.navBtn}>
          <MaterialIcons name="chevron-right" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={[styles.totalCard, {backgroundColor: colors.surface}]}>
        <Text style={[styles.totalLabel, {color: colors.textSecondary, fontFamily: fonts.medium}]}>
          Total Spent
        </Text>
        <Text style={[styles.totalAmount, {color: colors.text, fontFamily: fonts.bold}]}>
          {formatCurrency(total)}
        </Text>
        {prevTotal > 0 && (
          <View style={styles.changeRow}>
            <MaterialIcons
              name={changePercent >= 0 ? 'arrow-upward' : 'arrow-downward'}
              size={14}
              color={changePercent >= 0 ? colors.danger : colors.success}
            />
            <Text
              style={[
                styles.changeText,
                {
                  color: changePercent >= 0 ? colors.danger : colors.success,
                  fontFamily: fonts.medium,
                },
              ]}>
              {Math.abs(Math.round(changePercent))}% vs last month
            </Text>
          </View>
        )}
      </View>

      {breakdown.length > 0 && (
        <View style={[styles.card, {backgroundColor: colors.surface}]}>
          <Text style={[styles.cardTitle, {color: colors.text, fontFamily: fonts.semiBold}]}>
            Category Breakdown
          </Text>
          <StackedBar data={breakdown} height={14} />
          {breakdown.map(cat => (
            <View key={cat.id} style={styles.catRow}>
              <View style={[styles.catDot, {backgroundColor: cat.color}]} />
              <Text
                style={[styles.catName, {color: colors.textSecondary, fontFamily: fonts.regular}]}>
                {cat.name}
              </Text>
              <Text style={[styles.catPct, {color: colors.textTertiary, fontFamily: fonts.regular}]}>
                {Math.round(cat.percentage)}%
              </Text>
              <Text style={[styles.catAmt, {color: colors.text, fontFamily: fonts.semiBold}]}>
                {formatCurrency(cat.amount)}
              </Text>
            </View>
          ))}
        </View>
      )}

      {weekly.length > 0 && (
        <View style={[styles.card, {backgroundColor: colors.surface}]}>
          <Text style={[styles.cardTitle, {color: colors.text, fontFamily: fonts.semiBold}]}>
            Weekly Spending
          </Text>
          <BarChart
            data={weekly.map(w => ({...w, color: colors.primary}))}
            height={160}
          />
        </View>
      )}

      {insights.length > 0 && (
        <View style={styles.insightsSection}>
          <Text style={[styles.cardTitle, {color: colors.text, fontFamily: fonts.semiBold}]}>
            Insights & Trends
          </Text>
          {insights.map((ins, i) => (
            <InsightCard key={i} insight={ins} />
          ))}
        </View>
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  pageTitle: {fontSize: 26, fontWeight: '700', marginTop: 8, marginBottom: 16},
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  navBtn: {padding: 6},
  monthLabel: {fontSize: 16, fontWeight: '600', marginHorizontal: 16},
  totalCard: {borderRadius: 16, padding: 20, marginBottom: 16, alignItems: 'center'},
  totalLabel: {fontSize: 13, fontWeight: '500'},
  totalAmount: {fontSize: 32, fontWeight: '700', marginVertical: 4},
  changeRow: {flexDirection: 'row', alignItems: 'center', marginTop: 4},
  changeText: {fontSize: 12, fontWeight: '500', marginLeft: 4},
  card: {borderRadius: 16, padding: 18, marginBottom: 16},
  cardTitle: {fontSize: 15, fontWeight: '600', marginBottom: 14},
  catRow: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
  catDot: {width: 10, height: 10, borderRadius: 5, marginRight: 8},
  catName: {flex: 1, fontSize: 13},
  catPct: {fontSize: 12, marginRight: 10},
  catAmt: {fontSize: 13, fontWeight: '600'},
  insightsSection: {marginBottom: 20},
});

export default AnalyticsScreen;
