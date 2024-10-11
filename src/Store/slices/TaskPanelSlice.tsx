import React from "react";
import { map } from "lodash";
import { createSlice } from "@reduxjs/toolkit";
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
import { TaskPanelType } from "Types/TaskPanelTypes";

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
    searchInput: {
        searchInputValue: "",
        searchInputModalOpen: false,
    },
    hiddenAppsModalOpen: false,
    windowsModalOpen: false,
    systemPassword: SYSTEM_PASSWORD,
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
        handleClickOutside(state: TaskPanelType) {
            state.hiddenAppsModalOpen = false;
            state.searchInput.searchInputModalOpen = false;
            state.windowsModalOpen = false;
            state.isPowerModalOpen = false;
            state.isLanguagesModalOpen = false;
        },
        handleInputValue(state: TaskPanelType, action) {
            state.searchInput.searchInputValue = action.payload;
        },
        handleInputModal(state: TaskPanelType) {
            state.searchInput.searchInputModalOpen =
                !state.searchInput.searchInputModalOpen;
            state.windowsModalOpen = false;
            state.hiddenAppsModalOpen = false;
        },
        handleHiddenAppsModal(state: TaskPanelType) {
            state.hiddenAppsModalOpen = !state.hiddenAppsModalOpen;
            state.searchInput.searchInputModalOpen = false;
            state.windowsModalOpen = false;
            state.isLanguagesModalOpen = false;
        },
        handleWindowsModal(state: TaskPanelType) {
            state.windowsModalOpen = !state.windowsModalOpen;
            state.hiddenAppsModalOpen = false;
            state.searchInput.searchInputModalOpen = false;
            state.isLanguagesModalOpen = false;
        },
        handlePowerModal(state: TaskPanelType) {
            state.isPowerModalOpen = !state.isPowerModalOpen;
        },
        handleLanguagesModal(state: TaskPanelType) {
            state.isLanguagesModalOpen = !state.isLanguagesModalOpen;
            state.windowsModalOpen = false;
            state.hiddenAppsModalOpen = false;
        },
    },
});

export default taskPanelSlice.reducer;
export const {
    openingApp,
    changeApp,
    changeLanguageIndexByHotKeys,
    handleInputModal,
    handleInputValue,
    handleHiddenAppsModal,
    handleClickOutside,
    handleWindowsModal,
    handlePowerModal,
    handleLanguagesModal,
    changeLanguageIndex,
    addAppToTaskPanel,
} = taskPanelSlice.actions;
