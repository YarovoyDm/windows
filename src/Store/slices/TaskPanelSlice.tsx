import React from "react";
import { map } from "lodash";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    GOOGLE_CHROME,
    TASK_PANEL,
    SKYPE,
    STEAM,
    TELEGRAM,
    DEFAULT_LANGUAGE_INDEX,
    LANGUAGE_CHANGE_STEP,
    MAX_LANGUAGES,
    SYSTEM_PASSWORD,
} from "Constants/TaskPanel";
import Icon from "Components/Icon/Icon";
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
    systemLanguageIndex: DEFAULT_LANGUAGE_INDEX,
    systemPassword: SYSTEM_PASSWORD,
    isHiddenAppsModalOpen: false,
    isWindowsModalOpen: false,
    isWindowsUnlock: false,
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
        changeLanguageIndexByHotKeys(state: TaskPanelType) {
            if (state.systemLanguageIndex >= MAX_LANGUAGES) {
                state.systemLanguageIndex = DEFAULT_LANGUAGE_INDEX;
            } else {
                state.systemLanguageIndex += LANGUAGE_CHANGE_STEP;
            }
        },
        changeLanguageIndex(state: TaskPanelType, action) {
            state.systemLanguageIndex = action.payload;
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
    changeLanguageIndexByHotKeys,
    toggleModal,
    handleCloseAllModals,
    changeLanguageIndex,
    addAppToTaskPanel,
} = taskPanelSlice.actions;
