import { createSelector } from "@reduxjs/toolkit";
import { TaskPanelType } from "Types/TaskPanelTypes";
import { RootState } from "..";

const selectTaskPanel = (state: RootState) => state.taskPanel;

export const selectPowerModalState = createSelector(
    selectTaskPanel,
    (state: TaskPanelType) => state.isPowerModalOpen,
);
