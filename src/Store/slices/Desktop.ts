import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BIN, DESKTOP, FOLDER } from "Constants/Desktop";
import { TEXT_FILE } from "Constants/TaskPanel";
import { Desktop, IFile } from "Types/Desktop";

const initialDesktopState = {
    desktopFiles: [
        {
            name: "Read me!",
            icon: TEXT_FILE,
            position: { x: 50, y: 50 },
            isSelected: false,
            type: "text_file",
            innerContent: [],
        },
        {
            name: "Check what I have",
            icon: FOLDER,
            position: { x: 50, y: 150 },
            isSelected: false,
            type: "folder",
            innerContent: [],
        },
        {
            name: "Кошик",
            icon: BIN,
            position: { x: 1800, y: 750 },
            isSelected: false,
            type: "bin",
            innerContent: [],
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
        changeFilePosition(state: Desktop, action) {
            const file = state.desktopFiles.find(
                file => file.name === action.payload.name,
            );

            if (file) {
                file.position = action.payload.position;
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
        addDesktopFile(state, action: PayloadAction<IFile>) {
            state.desktopFiles.push(action.payload);
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
    changeFilePosition,
    addDesktopFile,
} = desktopSlice.actions;
