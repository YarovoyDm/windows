import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Desktop } from "Types/Desktop";

const selectDesktop = (state: RootState) => state.desktop;

export const selectFiles = createSelector(
    selectDesktop,
    (state: Desktop) => state.desktopFiles,
);

export const settingsModalState = createSelector(
    selectDesktop,
    (state: Desktop) => state.isSettingsModalOpen,
);
