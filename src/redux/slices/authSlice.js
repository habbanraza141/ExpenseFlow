import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    hydrateAuth: (state, action) => {
      state.user = action.payload.user || null;
      state.isAuthenticated = Boolean(action.payload.user);
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action) => {
      state.user = {...state.user, ...action.payload};
    },
  },
});

export const {hydrateAuth, setUser, logout, updateUser} = authSlice.actions;
export default authSlice.reducer;
