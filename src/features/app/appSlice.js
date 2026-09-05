import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
  language: "en",
  mobileMenuOpen: false,
};

const appSlice = createSlice({
  name: "app",

  initialState,

  reducers: {
    // =========================
    // THEME
    // =========================

    toggleTheme: (state) => {
      state.theme =
        state.theme === "dark" ? "light" : "dark";
    },

    setTheme: (state, action) => {
      state.theme = action.payload;
    },

    // =========================
    // LANGUAGE
    // =========================

    toggleLanguage: (state) => {
      state.language =
        state.language === "en" ? "ar" : "en";
    },

    setLanguage: (state, action) => {
      state.language = action.payload;
    },

    // =========================
    // MOBILE MENU
    // =========================

    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },

    openMobileMenu: (state) => {
      state.mobileMenuOpen = true;
    },

    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  toggleLanguage,
  setLanguage,
  toggleMobileMenu,
  openMobileMenu,
  closeMobileMenu,
} = appSlice.actions;

export default appSlice.reducer;