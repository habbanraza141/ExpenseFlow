import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    hydrateTheme: (state, action) => {
      state.mode = action.payload === 'dark' ? 'dark' : 'light';
    },
    toggleTheme: state => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const {hydrateTheme, toggleTheme, setTheme} = themeSlice.actions;
export default themeSlice.reducer;
