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
} as Desktop;

const desktopSlice = createSlice({
    name: DESKTOP,
    initialState: initialDesktopState,
    reducers: {
        removeFile(state: Desktop, action: PayloadAction<string>) {
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
        changeFilePosition(
            state: Desktop,
            action: PayloadAction<{
                name: string;
                position: { x: number; y: number };
            }>,
        ) {
            const file = state.desktopFiles.find(
                file => file.name === action.payload.name,
            );

            if (file) {
                file.position = action.payload.position;
            }
        },
        selectFile(state: Desktop, action: PayloadAction<string>) {
            if (!state.selectedFiles.includes(action.payload)) {
                state.selectedFiles.push(action.payload);
            }
        },
        deselectFile(state: Desktop, action: PayloadAction<string>) {
            if (Array.isArray(state.selectedFiles)) {
                state.selectedFiles = state.selectedFiles.filter(
                    fileName => fileName !== action.payload,
                );
            }
        },
        clearSelection(state: Desktop) {
            state.selectedFiles = [];
        },
        selectMultipleFiles(
            state: Desktop,
            action: PayloadAction<Array<string>>,
        ) {
            state.selectedFiles = action.payload;
        },
        addDesktopFile(state, action: PayloadAction<IFile>) {
            state.desktopFiles.push(action.payload);
        },
        openWindow(
            state: Desktop,
            action: PayloadAction<{
                fileName: string;
                content: string | Array<IFile>;
                id: string;
                zIndex: number;
                type: string;
                isSystem?: boolean;
            }>,
        ) {
            const { id } = action.payload;
            const currentFile = state.desktopFiles.filter(
                item => item.id === id,
            )[0];

            state.openedWindows.push(action.payload);

            if (currentFile) {
                currentFile.isOpened = true;
            }
        },
        closeWindow(state: Desktop, action: PayloadAction<string>) {
            const currentFile = state.desktopFiles.filter(
                item => item.id === action.payload,
            )[0];

            state.openedWindows = state.openedWindows.filter(
                window => window.id !== action.payload,
            );
            if (currentFile) {
                currentFile.isOpened = false;
            }
        },
        changeWindowZindex(state: Desktop, action: PayloadAction<string>) {
            const currentFile = state.openedWindows.filter(
                item => item.id === action.payload,
            )[0];

            state.openedWindows.forEach(
                (item, index) => (item.zIndex = index + 2),
            );
            currentFile.zIndex = 99;
        },
        updateFile(
            state: Desktop,
            action: PayloadAction<{
                id: string;
                newValue: Array<IFile> | string;
            }>,
        ) {
            const { id, newValue } = action.payload;
            const currentFile = state.desktopFiles.filter(
                item => item.id === id,
            )[0];

            currentFile.innerContent = newValue;
        },
        dragFileToFolder(
            state: Desktop,
            action: PayloadAction<{ fileName: string; folderName: string }>,
        ) {
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
