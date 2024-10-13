import { createSelector } from "@reduxjs/toolkit";
import { TaskPanelType } from "Types/TaskPanelTypes";
import { RootState } from "..";

const selectTaskPanel = (state: RootState) => state.taskPanel;

export const selectLanguageIndex = createSelector(
    selectTaskPanel,
    (state: TaskPanelType) => state.systemLanguageIndex,
);
export const selectPowerModalState = createSelector(
    selectTaskPanel,
    (state: TaskPanelType) => state.isPowerModalOpen,
);
