import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import {
    DEFAULT_LANGUAGE_INDEX,
    DESKTOP_FILE_SIZE,
    DESKTOP_FILE_SIZE_MEDIUM,
    LANGUAGE_CHANGE_STEP,
    MAX_LANGUAGES,
    SYSTEM,
    SYSTEM_PASSWORD,
} from "Constants/System";
import { SystemType } from "Types/System";

const initialSystemState = {
    systemLanguageIndex: DEFAULT_LANGUAGE_INDEX,
    systemPassword: SYSTEM_PASSWORD,
    isWindowsUnlock: false,
    desktopFileSize: DESKTOP_FILE_SIZE[DESKTOP_FILE_SIZE_MEDIUM],
} as SystemType;

const systemSlice = createSlice({
    name: SYSTEM,
    initialState: initialSystemState,
    reducers: {
        changeLanguageIndexByHotKeys(state: SystemType) {
            if (state.systemLanguageIndex >= MAX_LANGUAGES) {
                state.systemLanguageIndex = DEFAULT_LANGUAGE_INDEX;
            } else {
                state.systemLanguageIndex += LANGUAGE_CHANGE_STEP;
            }
        },
        changeLanguageIndex(state: SystemType, action) {
            state.systemLanguageIndex = action.payload;
        },
        changeDesktopFileSize(state: SystemType, action) {
            state.desktopFileSize = action.payload;
        },
    },
});

export default systemSlice.reducer;
export const {
    changeLanguageIndexByHotKeys,
    changeLanguageIndex,
    changeDesktopFileSize,
} = systemSlice.actions;
