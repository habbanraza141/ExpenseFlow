import {createSlice} from '@reduxjs/toolkit';
import CATEGORIES from '../../constants/categories';

const initialState = {
  categories: CATEGORIES,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(c => c.id !== action.payload);
    },
  },
});

export const {addCategory, removeCategory} = categorySlice.actions;
export default categorySlice.reducer;
