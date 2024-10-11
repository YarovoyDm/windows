import { createSlice } from "@reduxjs/toolkit";
import { BIN, DESKTOP, FOLDER } from "Constants/Desktop";
import { TEXT_FILE } from "Constants/TaskPanel";
import { Desktop } from "Types/Desktop";

const initialDesktopState = {
    desktopFiles: [
        {
            name: "Read me!",
            icon: TEXT_FILE,
            position: { x: 50, y: 50 },
            isSelected: false,
        },
        {
            name: "Check what I have",
            icon: FOLDER,
            position: { x: 50, y: 150 },
            isSelected: false,
        },
        {
            name: "Кошик",
            icon: BIN,
            position: { x: 1800, y: 750 },
            isSelected: false,
        },
    ],
    selectedFiles: [],
    bin: [],
    isSettingsModalOpen: false,
} as Desktop;

const desktopSlice = createSlice({
    name: DESKTOP,
    initialState: initialDesktopState,
    reducers: {
        removeFile(state: Desktop, action) {
            const fileToRemove = state.desktopFiles.find(
                item => item.name === action.payload,
            );

            if (fileToRemove) {
                state.desktopFiles = state.desktopFiles.filter(
                    item => item.name !== action.payload,
                );
                state.bin.push(fileToRemove);
            }
        },
        settingsModalHandler(state: Desktop) {
            state.isSettingsModalOpen = !state.isSettingsModalOpen;
        },
        selectFile(state: Desktop, action) {
            if (!state.selectedFiles.includes(action.payload)) {
                state.selectedFiles.push(action.payload);
            }
        },
        deselectFile(state: Desktop, action) {
            state.selectedFiles = state.selectedFiles.filter(
                fileName => fileName !== action.payload,
            );
        },
        clearSelection(state: Desktop) {
            state.selectedFiles = [];
        },
        selectMultipleFiles(state: Desktop, action) {
            state.selectedFiles = action.payload;
        },
    },
});

export default desktopSlice.reducer;
export const {
    removeFile,
    settingsModalHandler,
    selectFile,
    deselectFile,
    clearSelection,
    selectMultipleFiles,
} = desktopSlice.actions;
