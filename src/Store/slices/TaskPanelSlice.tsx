import React from "react";
import { map } from "lodash";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Icon from "Components/Icon/Icon";
import {
    GOOGLE_CHROME,
    TASK_PANEL,
    SKYPE,
    STEAM,
    TELEGRAM,
} from "Constants/TaskPanel";
import {
    DEFAULT_LANGUAGE_INDEX,
    LANGUAGE_CHANGE_STEP,
    MAX_LANGUAGES,
} from "Constants/System";
import { TaskPanelType, ToggleModalPayload } from "Types/TaskPanelTypes";

const initialTaskPanelState = {
    taskPanelApps: {
        [TELEGRAM]: {
            name: TELEGRAM,
            component: <Icon name={TELEGRAM} />,
            isOpen: false,
            isFocused: false,
        },
        [SKYPE]: {
            name: SKYPE,
            component: <Icon name={SKYPE} />,
            isOpen: false,
            isFocused: false,
        },
        [GOOGLE_CHROME]: {
            name: GOOGLE_CHROME,
            component: <Icon name={GOOGLE_CHROME} />,
            isOpen: false,
            isFocused: false,
        },
        [STEAM]: {
            name: STEAM,
            component: <Icon name={STEAM} />,
            isOpen: false,
            isFocused: false,
        },
    },
    isHiddenAppsModalOpen: false,
    isWindowsModalOpen: false,
    isPowerModalOpen: false,
    isLanguagesModalOpen: false,
} as TaskPanelType;

const taskPanelSlice = createSlice({
    name: TASK_PANEL,
    initialState: initialTaskPanelState,
    reducers: {
        addAppToTaskPanel(state: TaskPanelType, action) {
            state.taskPanelApps[action.payload.name] = action.payload;
        },
        openingApp(state: TaskPanelType, action) {
            state.taskPanelApps[action.payload].isOpen = true;
        },
        changeApp(state: TaskPanelType, action) {
            map(state.taskPanelApps, item => (item.isFocused = false));
            state.taskPanelApps[action.payload].isFocused = true;
        },
        handleCloseAllModals(state: TaskPanelType) {
            state.isHiddenAppsModalOpen = false;
            state.isWindowsModalOpen = false;
            state.isPowerModalOpen = false;
            state.isLanguagesModalOpen = false;
        },
        toggleModal(
            state: TaskPanelType,
            action: PayloadAction<ToggleModalPayload>,
        ) {
            const { modalName } = action.payload;

            state[modalName] = !state[modalName];
        },
    },
});

export default taskPanelSlice.reducer;
export const {
    openingApp,
    changeApp,
    toggleModal,
    handleCloseAllModals,
    addAppToTaskPanel,
} = taskPanelSlice.actions;
