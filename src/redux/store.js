import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import expenseReducer from './slices/expenseSlice';
import categoryReducer from './slices/categorySlice';
import budgetReducer from './slices/budgetSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
    categories: categoryReducer,
    budgets: budgetReducer,
    theme: themeReducer,
  },
});
