import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {ScreenWrapper, PrimaryButton} from '../components';
import {useTheme, useAppSelector, useAppDispatch} from '../hooks';
import {setBudget} from '../redux/slices/budgetSlice';
import {getCurrentMonthDates} from '../utils/dateUtils';
import {getMonthlyExpenses, getBudgetUsage} from '../utils/analytics';
import {formatCurrency} from '../utils/currency';
import {fonts} from '../constants/fonts';

const BudgetScreen = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const expenses = useAppSelector(s => s.expenses.expenses);
  const budgets = useAppSelector(s => s.budgets.budgets);

  const {month, year} = getCurrentMonthDates();
  const monthlyExpenses = useMemo(
    () => getMonthlyExpenses(expenses, month, year),
    [expenses, month, year],
  );
  const budgetData = useMemo(
    () => getBudgetUsage(monthlyExpenses, budgets),
    [monthlyExpenses, budgets],
  );

  const totalBudget = budgets.reduce((s, b) => s + b.monthlyLimit, 0);

  const [editingCat, setEditingCat] = useState(null);
  const [editValue, setEditValue] = useState('');

  const openEdit = item => {
    setEditingCat(item);
    setEditValue(String(item.limit));
  };

  const saveEdit = () => {
    const num = parseFloat(editValue);
    if (!isNaN(num) && num > 0 && editingCat) {
      dispatch(setBudget({category: editingCat.id, monthlyLimit: num}));
    }
    setEditingCat(null);
  };

  const renderItem = ({item}) => {
    const barColor = item.isOverBudget
      ? colors.danger
      : item.rawPercentage > 80
      ? colors.warning
      : item.color;

    return (
      <TouchableOpacity
        style={[styles.budgetCard, {backgroundColor: colors.surface}]}
        onPress={() => openEdit(item)}
        activeOpacity={0.7}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconWrap, {backgroundColor: item.color + '18'}]}>
            <MaterialIcons name={item.icon} size={20} color={item.color} />
          </View>
          <View style={styles.cardInfo}>
            <Text style={[styles.cardName, {color: colors.text, fontFamily: fonts.semiBold}]}>
              {item.name}
            </Text>
            <Text
              style={[styles.cardAmounts, {color: colors.textSecondary, fontFamily: fonts.regular}]}>
              {formatCurrency(item.spent)} / {formatCurrency(item.limit)}
            </Text>
          </View>
          {item.isOverBudget && (
            <MaterialIcons
              name="error"
              size={20}
              color={colors.danger}
            />
          )}
          <MaterialIcons
            name="edit"
            size={18}
            color={colors.textTertiary}
            style={styles.editIcon}
          />
        </View>
        <View style={[styles.progressTrack, {backgroundColor: colors.border}]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(item.rawPercentage, 100)}%`,
                backgroundColor: barColor,
              },
            ]}
          />
        </View>
        <Text
          style={[
            styles.remaining,
            {
              color: item.isOverBudget ? colors.danger : colors.textSecondary,
              fontFamily: fonts.regular,
            },
          ]}>
          {item.isOverBudget
            ? `Over budget by ${formatCurrency(item.spent - item.limit)}`
            : `${formatCurrency(item.remaining)} remaining`}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenWrapper padded={false}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.pageTitle, {color: colors.text, fontFamily: fonts.bold}]}>
          Budget Settings
        </Text>
      </View>

      <View style={[styles.totalRow, {backgroundColor: colors.primaryBg}]}>
        <Text style={[styles.totalLabel, {color: colors.primary, fontFamily: fonts.medium}]}>
          Total Monthly Budget
        </Text>
        <Text style={[styles.totalValue, {color: colors.primary, fontFamily: fonts.bold}]}>
          {formatCurrency(totalBudget)}
        </Text>
      </View>

      <FlatList
        data={budgetData}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={!!editingCat}
        transparent
        animationType="fade"
        onRequestClose={() => setEditingCat(null)}>
        <View style={[styles.modalOverlay, {backgroundColor: colors.overlay}]}>
          <View style={[styles.modalContent, {backgroundColor: colors.surface}]}>
            <Text style={[styles.modalTitle, {color: colors.text, fontFamily: fonts.semiBold}]}>
              Set Budget for {editingCat?.name}
            </Text>
            <View style={[styles.modalInput, {borderColor: colors.border, backgroundColor: colors.background}]}>
              <Text style={[styles.dollarPrefix, {color: colors.textSecondary}]}>$</Text>
              <TextInput
                value={editValue}
                onChangeText={setEditValue}
                keyboardType="decimal-pad"
                style={[styles.modalTextInput, {color: colors.text, fontFamily: fonts.medium}]}
                autoFocus
                selectTextOnFocus
              />
            </View>
            <View style={styles.modalBtns}>
              <PrimaryButton
                title="Cancel"
                variant="outline"
                onPress={() => setEditingCat(null)}
                style={styles.modalBtn}
              />
              <PrimaryButton
                title="Save"
                onPress={saveEdit}
                style={styles.modalBtn}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {marginRight: 10, padding: 4},
  pageTitle: {fontSize: 22, fontWeight: '700'},
  totalRow: {
    marginHorizontal: 20,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {fontSize: 13, fontWeight: '500'},
  totalValue: {fontSize: 26, fontWeight: '700', marginTop: 2},
  list: {paddingHorizontal: 20, paddingBottom: 20},
  budgetCard: {borderRadius: 14, padding: 16, marginBottom: 12},
  cardHeader: {flexDirection: 'row', alignItems: 'center', marginBottom: 12},
  iconWrap: {width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center'},
  cardInfo: {flex: 1, marginLeft: 12},
  cardName: {fontSize: 14, fontWeight: '600'},
  cardAmounts: {fontSize: 12, marginTop: 1},
  editIcon: {marginLeft: 8},
  progressTrack: {height: 8, borderRadius: 4, overflow: 'hidden'},
  progressFill: {height: 8, borderRadius: 4},
  remaining: {fontSize: 11, marginTop: 6},
  modalOverlay: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  modalContent: {width: '80%', borderRadius: 20, padding: 24},
  modalTitle: {fontSize: 17, fontWeight: '600', marginBottom: 16, textAlign: 'center'},
  modalInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 20,
  },
  dollarPrefix: {fontSize: 18, marginRight: 6},
  modalTextInput: {flex: 1, fontSize: 18, fontWeight: '500'},
  modalBtns: {flexDirection: 'row', gap: 12},
  modalBtn: {flex: 1},
});

export default BudgetScreen;
