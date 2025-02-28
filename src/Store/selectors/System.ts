import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { SystemType } from "Types/System";

const selectSystem = (state: RootState) => state.system;

export const selectLanguageIndex = createSelector(
    selectSystem,
    (state: SystemType) => state.inputLanguageIndex,
);

export const selectFileSize = createSelector(
    selectSystem,
    (state: SystemType) => state.desktopFileSize,
);

export const selectWallpaper = createSelector(
    selectSystem,
    (state: SystemType) => state.wallpaper,
);

export const selectSystemLanguage = createSelector(
    selectSystem,
    (state: SystemType) => state.systemLanguage,
);

export const selectSystemScenario = createSelector(
    selectSystem,
    (state: SystemType) => state.systemScenario,
);

export const selectSystemBrightness = createSelector(
    selectSystem,
    (state: SystemType) => state.brightness,
);
