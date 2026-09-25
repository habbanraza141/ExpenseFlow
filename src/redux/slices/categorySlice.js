import {createSlice} from '@reduxjs/toolkit';
import CATEGORIES from '../../constants/categories';

const initialState = {
  categories: CATEGORIES,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    hydrateCategories: (state, action) => {
      state.categories = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(c => c.id !== action.payload);
    },
  },
});

export const {hydrateCategories, addCategory, removeCategory} = categorySlice.actions;
export default categorySlice.reducer;
