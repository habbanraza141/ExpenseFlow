import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScreenWrapper, PrimaryButton, TextInputField, CategoryPicker} from '../components';
import {useTheme, useAppDispatch} from '../hooks';
import {addExpense, editExpense, deleteExpense} from '../redux/slices/expenseSlice';
import {validateAmount} from '../utils/validation';
import {getLast7Days} from '../utils/dateUtils';
import {fonts} from '../constants/fonts';

const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2, 6);

const AddExpenseScreen = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useAppDispatch();

  const existing = route.params?.expense;
  const isEdit = !!existing;

  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('food');
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const days = getLast7Days();

  useEffect(() => {
    if (existing) {
      setAmount(String(existing.amount));
      setTitle(existing.title);
      setCategory(existing.category);
      setSelectedDate(existing.date);
      setDescription(existing.description || '');
    }
  }, [existing]);

  const handleSave = () => {
    const amtErr = validateAmount(amount);
    const titleErr = !title.trim() ? 'Title is required' : null;
    if (amtErr || titleErr) {
      setErrors({amount: amtErr, title: titleErr});
      return;
    }

    const expense = {
      id: isEdit ? existing.id : generateId(),
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      date: selectedDate,
      description: description.trim(),
    };

    if (isEdit) {
      dispatch(editExpense(expense));
    } else {
      dispatch(addExpense(expense));
    }
    navigation.goBack();
  };

  const handleDeletePress = () => {
    Alert.alert('Delete Expense', `Remove "${existing.title}"?`, [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteExpense(existing.id));
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <ScreenWrapper withKeyboard padded={false}>
      <View style={[styles.topBar, {borderBottomColor: colors.border}]}>
        <TouchableOpacity
          style={[styles.closeBtn, {backgroundColor: colors.surfaceVariant}]}
          onPress={() => navigation.goBack()}>
          <MaterialIcons name="close" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.topTitle, {color: colors.text, fontFamily: fonts.semiBold}]}>
          {isEdit ? 'Edit Expense' : 'New Expense'}
        </Text>
        <View style={styles.closeBtn} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={[styles.amountBox, {backgroundColor: colors.primaryBg}]}>
          <Text style={[styles.dollarSign, {color: colors.primary, fontFamily: fonts.bold}]}>
            $
          </Text>
          <TextInputField
            placeholder="0.00"
            value={amount}
            onChangeText={t => {
              setAmount(t);
              setErrors(prev => ({...prev, amount: null}));
            }}
            keyboardType="decimal-pad"
            error={errors.amount}
            style={styles.amountInput}
            inputStyle={[styles.amountText, {color: colors.primary, fontFamily: fonts.bold}]}
          />
        </View>

        <View style={styles.form}>
          <TextInputField
            label="Title"
            placeholder="What did you spend on?"
            value={title}
            onChangeText={t => {
              setTitle(t);
              setErrors(prev => ({...prev, title: null}));
            }}
            leftIcon="local-offer"
            error={errors.title}
          />

          <Text
            style={[styles.fieldLabel, {color: colors.textSecondary, fontFamily: fonts.medium}]}>
            Category
          </Text>
          <CategoryPicker selected={category} onSelect={setCategory} />

          <Text
            style={[
              styles.fieldLabel,
              {color: colors.textSecondary, fontFamily: fonts.medium, marginTop: 16},
            ]}>
            Date
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.dateRow}>
            {days.map(day => {
              const active =
                new Date(selectedDate).toDateString() ===
                new Date(day.timestamp).toDateString();
              return (
                <TouchableOpacity
                  key={day.timestamp}
                  style={[
                    styles.dateChip,
                    {
                      backgroundColor: active ? colors.primary : colors.surface,
                      borderColor: active ? colors.primary : colors.border,
                    },
                  ]}
                  onPress={() => setSelectedDate(day.timestamp)}>
                  <Text
                    style={[
                      styles.dateChipText,
                      {
                        color: active ? '#FFF' : colors.textSecondary,
                        fontFamily: active ? fonts.semiBold : fonts.regular,
                      },
                    ]}>
                    {day.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TextInputField
            label="Description (optional)"
            placeholder="Add a note"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            leftIcon="notes"
            style={{marginTop: 16}}
          />

          <PrimaryButton
            title={isEdit ? 'Save Changes' : 'Add Expense'}
            onPress={handleSave}
            style={styles.saveBtn}
          />

          {isEdit && (
            <PrimaryButton
              title="Delete Expense"
              onPress={handleDeletePress}
              variant="danger"
              style={styles.deleteBtn}
            />
          )}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  closeBtn: {width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center'},
  topTitle: {fontSize: 17, fontWeight: '600'},
  scroll: {paddingBottom: 40},
  amountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
  },
  dollarSign: {fontSize: 32, fontWeight: '700', marginRight: 4},
  amountInput: {flex: 1, marginBottom: 0},
  amountText: {fontSize: 32, fontWeight: '700', textAlign: 'center'},
  form: {paddingHorizontal: 20, paddingTop: 20},
  fieldLabel: {fontSize: 13, fontWeight: '500', marginBottom: 8},
  dateRow: {marginBottom: 4},
  dateChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  dateChipText: {fontSize: 12, fontWeight: '500'},
  saveBtn: {marginTop: 24},
  deleteBtn: {marginTop: 12},
});

export default AddExpenseScreen;
