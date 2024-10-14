import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { SystemType } from "Types/System";

const selectSystem = (state: RootState) => state.system;

export const selectLanguageIndex = createSelector(
    selectSystem,
    (state: SystemType) => state.systemLanguageIndex,
);

export const selectFileSize = createSelector(
    selectSystem,
    (state: SystemType) => state.desktopFileSize,
);
