import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { BIN, DESKTOP, FOLDER } from "Constants/Desktop";
import { TEXT_FILE } from "Constants/TaskPanel";
import { Desktop } from "Types/Desktop";

const initialDesktopState = {
    desktopFiles: [
        { name: "Read me!", icon: TEXT_FILE, position: { x: 50, y: 50 } },
        {
            name: "Check what I have",
            icon: FOLDER,
            position: { x: 50, y: 150 },
        },
        {
            name: "Кошик",
            icon: BIN,
            position: { x: 1800, y: 750 },
        },
    ],
    bin: [],
    isSettingsModalOpen: false,
} as Desktop;

const desktopSlice = createSlice({
    name: DESKTOP,
    initialState: initialDesktopState,
    reducers: {
        removeFile(state: Desktop, action) {
            state.desktopFiles = state.desktopFiles.filter(
                item => item.name !== action.payload,
            );
            state.bin.push(
                state.desktopFiles.filter(
                    item => item.name !== action.payload,
                )[0],
            );
        },
        settingsModalHandler(state: Desktop) {
            state.isSettingsModalOpen = !state.isSettingsModalOpen;
        },
    },
});

export default desktopSlice.reducer;
export const { removeFile, settingsModalHandler } = desktopSlice.actions;
