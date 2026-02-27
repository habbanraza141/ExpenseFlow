import React, {useMemo} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {ScreenWrapper, ExpenseCard, FloatingActionButton, StackedBar} from '../components';
import {useTheme, useAppSelector, useAppDispatch} from '../hooks';
import {toggleTheme} from '../redux/slices/themeSlice';
import {formatCurrency} from '../utils/currency';
import {getMonthYear, getCurrentMonthDates} from '../utils/dateUtils';
import {
  getMonthlyExpenses,
  getTotalSpent,
  getCategoryBreakdown,
} from '../utils/analytics';
import {fonts} from '../constants/fonts';

const HomeScreen = () => {
  const {colors, mode} = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const expenses = useAppSelector(s => s.expenses.expenses);
  const budgets = useAppSelector(s => s.budgets.budgets);
  const user = useAppSelector(s => s.auth.user);

  const {month, year} = getCurrentMonthDates();

  const monthlyExpenses = useMemo(
    () => getMonthlyExpenses(expenses, month, year),
    [expenses, month, year],
  );
  const totalSpent = useMemo(() => getTotalSpent(monthlyExpenses), [monthlyExpenses]);
  const breakdown = useMemo(
    () => getCategoryBreakdown(monthlyExpenses),
    [monthlyExpenses],
  );

  const totalBudget = budgets.reduce((s, b) => s + b.monthlyLimit, 0);
  const budgetPct = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;

  const recentExpenses = useMemo(
    () => [...expenses].sort((a, b) => b.date - a.date).slice(0, 5),
    [expenses],
  );

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.greeting, {color: colors.textSecondary, fontFamily: fonts.regular}]}>
            {greeting()},
          </Text>
          <Text style={[styles.userName, {color: colors.text, fontFamily: fonts.bold}]}>
            {user?.name || 'User'}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.themeBtn, {backgroundColor: colors.surface}]}
          onPress={() => dispatch(toggleTheme())}>
          <MaterialIcons
            name={mode === 'dark' ? 'wb-sunny' : 'nights-stay'}
            size={20}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.summaryCard, {backgroundColor: colors.primary}]}>
        <Text style={[styles.sumLabel, {fontFamily: fonts.medium}]}>Total Spending</Text>
        <Text style={[styles.sumAmount, {fontFamily: fonts.bold}]}>
          {formatCurrency(totalSpent)}
        </Text>
        <Text style={[styles.sumMonth, {fontFamily: fonts.regular}]}>
          {getMonthYear(Date.now())}
        </Text>
        <View style={styles.budgetRow}>
          <View style={styles.budgetTrack}>
            <View style={[styles.budgetFill, {width: `${budgetPct}%`}]} />
          </View>
          <Text style={[styles.budgetPct, {fontFamily: fonts.medium}]}>
            {Math.round(budgetPct)}%
          </Text>
        </View>
        <Text style={[styles.budgetLabel, {fontFamily: fonts.regular}]}>
          of {formatCurrency(totalBudget)} budget
        </Text>
      </View>

      {breakdown.length > 0 && (
        <View style={[styles.section, {backgroundColor: colors.surface}]}>
          <Text style={[styles.secTitle, {color: colors.text, fontFamily: fonts.semiBold}]}>
            Spending Overview
          </Text>
          <StackedBar data={breakdown} height={12} />
          <View style={styles.legend}>
            {breakdown.slice(0, 4).map(cat => (
              <View key={cat.id} style={styles.legendItem}>
                <View style={[styles.legendDot, {backgroundColor: cat.color}]} />
                <Text
                  style={[styles.legendName, {color: colors.textSecondary, fontFamily: fonts.regular}]}>
                  {cat.name.split('&')[0].trim()}
                </Text>
                <Text style={[styles.legendAmt, {color: colors.text, fontFamily: fonts.semiBold}]}>
                  {formatCurrency(cat.amount)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.secHeader}>
        <Text style={[styles.secTitle, {color: colors.text, fontFamily: fonts.semiBold}]}>
          Recent Expenses
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Expenses')}>
          <Text style={[styles.seeAll, {color: colors.primary, fontFamily: fonts.medium}]}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScreenWrapper padded={false}>
      <FlatList
        data={recentExpenses}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
          <View style={styles.cardPad}>
            <ExpenseCard
              expense={item}
              onPress={() => navigation.navigate('AddExpense', {expense: item})}
            />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.cardPad}>
            <Text style={[styles.emptyText, {color: colors.textTertiary, fontFamily: fonts.regular}]}>
              No expenses yet. Tap + to get started!
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
      <FloatingActionButton onPress={() => navigation.navigate('AddExpense')} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  list: {paddingBottom: 90},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerLeft: {},
  greeting: {fontSize: 14},
  userName: {fontSize: 22, fontWeight: '700'},
  themeBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 22,
    marginBottom: 20,
  },
  sumLabel: {color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: '500'},
  sumAmount: {color: '#FFF', fontSize: 34, fontWeight: '700', marginVertical: 4},
  sumMonth: {color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 14},
  budgetRow: {flexDirection: 'row', alignItems: 'center'},
  budgetTrack: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 3,
  },
  budgetFill: {height: 6, backgroundColor: '#FFF', borderRadius: 3},
  budgetPct: {color: '#FFF', fontSize: 12, fontWeight: '600', marginLeft: 10},
  budgetLabel: {color: 'rgba(255,255,255,0.65)', fontSize: 11, marginTop: 6},
  section: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
  },
  secHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  secTitle: {fontSize: 16, fontWeight: '600', marginBottom: 12},
  seeAll: {fontSize: 13, fontWeight: '500'},
  legend: {marginTop: 14},
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendDot: {width: 10, height: 10, borderRadius: 5, marginRight: 8},
  legendName: {flex: 1, fontSize: 13},
  legendAmt: {fontSize: 13, fontWeight: '600'},
  cardPad: {paddingHorizontal: 20},
  emptyText: {textAlign: 'center', paddingVertical: 40, fontSize: 14},
});

export default HomeScreen;
