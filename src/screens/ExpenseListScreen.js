import React, {useState, useMemo, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList, Alert, TextInput} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
  const [query, setQuery] = useState('');

  const sorted = useMemo(
    () => [...expenses].sort((a, b) => b.date - a.date),
    [expenses],
  );

  const filtered = useMemo(
    () => {
      const normalizedQuery = query.trim().toLowerCase();
      return sorted.filter(expense => {
        const matchesCategory = filterCat === 'all' || expense.category === filterCat;
        const matchesQuery =
          !normalizedQuery ||
          expense.title.toLowerCase().includes(normalizedQuery) ||
          expense.description?.toLowerCase().includes(normalizedQuery);
        return matchesCategory && matchesQuery;
      });
    },
    [sorted, filterCat, query],
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

      <View style={[styles.searchBox, {backgroundColor: colors.surface, borderColor: colors.border}]}>
        <MaterialIcons name="search" size={20} color={colors.textTertiary} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search expenses"
          placeholderTextColor={colors.textTertiary}
          style={[styles.searchInput, {color: colors.text, fontFamily: fonts.regular}]}
          returnKeyType="search"
        />
        {!!query && (
          <MaterialIcons
            name="close"
            size={18}
            color={colors.textTertiary}
            onPress={() => setQuery('')}
          />
        )}
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
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 12,
    height: 46,
  },
  searchInput: {flex: 1, marginLeft: 8, fontSize: 14},
});

export default ExpenseListScreen;
