import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BIN, DESKTOP, FOLDER } from "Constants/Desktop";
import { TEXT_FILE } from "Constants/System";
import { Desktop, IFile } from "Types/Desktop";

const initialDesktopState = {
    desktopFiles: [
        {
            name: "Read me!",
            icon: TEXT_FILE,
            position: { x: 50, y: 50 },
            isSelected: false,
            isOpened: false,
            type: TEXT_FILE,
            innerContent: "Hello from text file, looks like it's work",
            id: ":2d",
        },
        {
            name: "Check what I have",
            icon: FOLDER,
            position: { x: 50, y: 150 },
            isSelected: false,
            type: "folder",
            isOpened: false,
            innerContent: [],
            id: "223/",
        },
        {
            name: "Кошик",
            icon: BIN,
            position: { x: 1800, y: 750 },
            isSelected: false,
            isOpened: false,
            type: "folder",
            innerContent: [],
            id: "ds5",
        },
    ],
    selectedFiles: [],
    bin: [],
    openedWindows: [],
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
        openWindow(state: Desktop, action) {
            const { id } = action.payload;
            const currentFile = state.desktopFiles.filter(
                item => item.id === id,
            )[0];

            state.openedWindows.push(action.payload);
            currentFile.isOpened = true;
        },
        closeWindow(state: Desktop, action) {
            const { id } = action.payload;
            const currentFile = state.desktopFiles.filter(
                item => item.id === id,
            )[0];

            state.openedWindows = state.openedWindows.filter(
                window => window.id !== id,
            );
            currentFile.isOpened = false;
        },
        changeWindowZindex(state: Desktop, action) {
            const { id } = action.payload;
            const currentFile = state.openedWindows.filter(
                item => item.id === id,
            )[0];

            state.openedWindows.forEach(
                (item, index) => (item.zIndex = index + 2),
            );
            currentFile.zIndex = 99;
        },
        updateFile(state: Desktop, action) {
            const { id, newValue } = action.payload;
            const currentFile = state.desktopFiles.filter(
                item => item.id === id,
            )[0];

            currentFile.innerContent = newValue;
        },
        dragFileToFolder(state: Desktop, action) {
            const { fileName, folderName } = action.payload;
            const targetFolder = state.desktopFiles.filter(
                item => item.name === folderName,
            )[0];
            const file = state.desktopFiles.filter(
                item => item.name === fileName,
            )[0];

            if (Array.isArray(targetFolder.innerContent)) {
                targetFolder.innerContent.push(file);
            }
            state.desktopFiles = state.desktopFiles.filter(
                item => item.name !== fileName,
            );
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
    openWindow,
    closeWindow,
    changeWindowZindex,
    updateFile,
    dragFileToFolder,
} = desktopSlice.actions;
