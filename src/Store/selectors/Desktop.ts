import { createSelector } from "@reduxjs/toolkit";
import { Desktop } from "Types/Desktop";
import { RootState } from "..";

const selectDesktop = (state: RootState) => state.desktop;

export const selectFiles = createSelector(
    selectDesktop,
    (state: Desktop) => state.desktopFiles,
);

export const selectSettingsModalState = createSelector(
    selectDesktop,
    (state: Desktop) => state.isSettingsModalOpen,
);
