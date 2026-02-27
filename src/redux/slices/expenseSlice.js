import {createSlice} from '@reduxjs/toolkit';
import {SAMPLE_EXPENSES} from '../../constants/sampleData';

const initialState = {
  expenses: SAMPLE_EXPENSES,
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.unshift(action.payload);
    },
    editExpense: (state, action) => {
      const idx = state.expenses.findIndex(e => e.id === action.payload.id);
      if (idx !== -1) {
        state.expenses[idx] = action.payload;
      }
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(e => e.id !== action.payload);
    },
  },
});

export const {addExpense, editExpense, deleteExpense} = expenseSlice.actions;
export default expenseSlice.reducer;
