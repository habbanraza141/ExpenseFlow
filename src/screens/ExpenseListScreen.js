import React, {useState, useMemo, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  ScreenWrapper,
  ExpenseCard,
  FloatingActionButton,
  CategoryPicker,
  EmptyState,
} from '../components';
import {useTheme, useAppSelector, useAppDispatch} from '../hooks';
import {deleteExpense} from '../redux/slices/expenseSlice';
import {fonts} from '../constants/fonts';

const ExpenseListScreen = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const expenses = useAppSelector(s => s.expenses.expenses);
  const [filterCat, setFilterCat] = useState('all');

  const sorted = useMemo(
    () => [...expenses].sort((a, b) => b.date - a.date),
    [expenses],
  );

  const filtered = useMemo(
    () => (filterCat === 'all' ? sorted : sorted.filter(e => e.category === filterCat)),
    [sorted, filterCat],
  );

  const handleDelete = useCallback(
    expense => {
      Alert.alert(
        'Delete Expense',
        `Remove "${expense.title}"?`,
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => dispatch(deleteExpense(expense.id)),
          },
        ],
      );
    },
    [dispatch],
  );

  return (
    <ScreenWrapper padded={false}>
      <View style={styles.headerArea}>
        <Text style={[styles.title, {color: colors.text, fontFamily: fonts.bold}]}>
          Expenses
        </Text>
        <Text style={[styles.count, {color: colors.textSecondary, fontFamily: fonts.regular}]}>
          {filtered.length} transaction{filtered.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <View style={styles.filterWrap}>
        <CategoryPicker
          selected={filterCat}
          onSelect={setFilterCat}
          horizontal
          showAll
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
          <View style={styles.cardPad}>
            <ExpenseCard
              expense={item}
              onPress={() => navigation.navigate('AddExpense', {expense: item})}
              onLongPress={() => handleDelete(item)}
            />
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            icon="search"
            message={
              filterCat !== 'all'
                ? 'No expenses in this category'
                : 'No expenses yet. Add your first one!'
            }
          />
        }
        showsVerticalScrollIndicator={false}
      />
      <FloatingActionButton onPress={() => navigation.navigate('AddExpense')} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  headerArea: {paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4},
  title: {fontSize: 26, fontWeight: '700'},
  count: {fontSize: 13, marginTop: 2},
  filterWrap: {paddingLeft: 20, marginBottom: 8},
  list: {paddingBottom: 90},
  cardPad: {paddingHorizontal: 20},
});

export default ExpenseListScreen;
