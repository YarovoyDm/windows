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
    systemLanguage: "ua",
    isWindowsUnlock: false,
    desktopFileSize: DESKTOP_FILE_SIZE[DESKTOP_FILE_SIZE_MEDIUM],
    wallpaper: WALLPAPERS[3],
    systemScenario: "start",
    brightness: 1,
    isNightMode: false,
    selectionStyles: {
        borderColor: "#4a90e2",
        areaColor: "rgba(74, 144, 226, 0.2)",
    },
    fileSelectionColor: "rgba(179, 180, 179, 1)",
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
        updateSystemScenario(state: SystemType, action) {
            state.systemScenario = action.payload;
        },
        changeBrightness(state: SystemType, action: PayloadAction<number>) {
            state.brightness = action.payload;
        },
        changeNightMode(state: SystemType) {
            state.isNightMode = !state.isNightMode;
        },
        changeSelectionStyle(
            state: SystemType,
            action: PayloadAction<{
                key: keyof typeof state.selectionStyles;
                value: string;
            }>,
        ) {
            state.selectionStyles[action.payload.key] = action.payload.value;
        },
        changeFileSelectionColor(
            state: SystemType,
            action: PayloadAction<string>,
        ) {
            state.fileSelectionColor = action.payload;
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
    updateSystemScenario,
    changeBrightness,
    changeNightMode,
    changeSelectionStyle,
    changeFileSelectionColor,
} = systemSlice.actions;
