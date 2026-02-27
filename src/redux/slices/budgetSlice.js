import {createSlice} from '@reduxjs/toolkit';
import {SAMPLE_BUDGETS} from '../../constants/sampleData';

const initialState = {
  budgets: SAMPLE_BUDGETS,
};

const budgetSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    setBudget: (state, action) => {
      const {category, monthlyLimit} = action.payload;
      const existing = state.budgets.find(b => b.category === category);
      if (existing) {
        existing.monthlyLimit = monthlyLimit;
      } else {
        state.budgets.push({category, monthlyLimit});
      }
    },
    removeBudget: (state, action) => {
      state.budgets = state.budgets.filter(b => b.category !== action.payload);
    },
  },
});

export const {setBudget, removeBudget} = budgetSlice.actions;
export default budgetSlice.reducer;
