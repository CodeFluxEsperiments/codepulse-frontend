import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: {
      mode: 'light', // Set the initial theme mode to 'light' or 'dark'
    },
  },
  reducers: {
    toggleThemeMode: (state) => {
      // Toggle the theme mode between 'light' and 'dark'
      state.theme.mode = state.theme.mode === 'dark' ? 'light' : 'dark';
    },
  },
});

export const { toggleThemeMode } = uiSlice.actions;
export default uiSlice.reducer;
