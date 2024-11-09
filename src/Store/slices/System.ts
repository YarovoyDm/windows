import React from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    DEFAULT_LANGUAGE_INDEX,
    DESKTOP_FILE_SIZE,
    DESKTOP_FILE_SIZE_MEDIUM,
    LANGUAGE_CHANGE_STEP,
    MAX_LANGUAGES,
    SYSTEM,
    SYSTEM_PASSWORD,
    WALLPAPERS,
} from "Constants/System";
import { SystemType } from "Types/System";

const initialSystemState = {
    inputLanguageIndex: DEFAULT_LANGUAGE_INDEX,
    systemPassword: SYSTEM_PASSWORD,
    systemLanguage: "en",
    isWindowsUnlock: false,
    desktopFileSize: DESKTOP_FILE_SIZE[DESKTOP_FILE_SIZE_MEDIUM],
    wallpaper: WALLPAPERS[4],
} as SystemType;

const systemSlice = createSlice({
    name: SYSTEM,
    initialState: initialSystemState,
    reducers: {
        changeLanguageIndexByHotKeys(state: SystemType) {
            if (state.inputLanguageIndex >= MAX_LANGUAGES) {
                state.inputLanguageIndex = DEFAULT_LANGUAGE_INDEX;
            } else {
                state.inputLanguageIndex += LANGUAGE_CHANGE_STEP;
            }
        },
        changeLanguageIndex(state: SystemType, action) {
            state.inputLanguageIndex = action.payload;
        },
        changeDesktopFileSize(state: SystemType, action) {
            state.desktopFileSize = action.payload;
        },
        changeWallpaper(state: SystemType, action) {
            state.wallpaper = action.payload;
        },
        toggleWindowsUnlock(state: SystemType, action: PayloadAction<boolean>) {
            state.isWindowsUnlock = action.payload;
        },
        changeSystemLanguage(state: SystemType, action: PayloadAction<string>) {
            state.systemLanguage = action.payload;
        },
    },
});

export default systemSlice.reducer;
export const {
    changeLanguageIndexByHotKeys,
    changeLanguageIndex,
    changeDesktopFileSize,
    changeWallpaper,
    toggleWindowsUnlock,
    changeSystemLanguage,
} = systemSlice.actions;
