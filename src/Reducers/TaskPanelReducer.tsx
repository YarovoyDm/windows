import React from "react";
import { map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { GOOGLE_CHROME, TASK_PANEL, SKYPE, STEAM, TELEGRAM } from 'Constants/TaskPanel';
import { ReactComponent as Telegram } from 'Icons/telegramIcon.svg';
import { ReactComponent as Skype } from 'Icons/skypeIcon.svg';
import { ReactComponent as Chrome } from 'Icons/chromeIcon.svg';
import { ReactComponent as Steam } from 'Icons/steamIcon.svg';

type TaskPanelType = {
    taskPanelApps: { [key: string]: { name: string, isOpen?: boolean, isFocused?: boolean, component: React.ReactElement } },
    systemLanguageIndex: number,
    searchInput: {
        searchInputValue: string,
        searchInputModalOpen: boolean,
    },
    hiddenAppsModalOpen: boolean,
};

const initialTaskPanelState = {
    taskPanelApps: {
        [TELEGRAM]: { name: TELEGRAM, component: <Telegram className='icon'/>, isOpen: false, isFocused: false },
        [SKYPE]: { name: SKYPE, component: <Skype className='icon'/>, isOpen: false, isFocused: false },
        [GOOGLE_CHROME]: { name: GOOGLE_CHROME, component: <Chrome className='icon'/>, isOpen: false, isFocused: false },
        [STEAM]: { name: STEAM, component: <Steam className='icon'/>, isOpen: false, isFocused: false },
    },
    systemLanguageIndex: 0,
    searchInput: {
        searchInputValue: '',
        searchInputModalOpen: false,
    },
    hiddenAppsModalOpen: false,
} as TaskPanelType;

const taskPanelSlice = createSlice({
    name: TASK_PANEL,
    initialState: initialTaskPanelState,
    reducers: {
        openingApp(state: TaskPanelType, action) {
            state.taskPanelApps[action.payload].isOpen = true;
        },
        changeApp(state: TaskPanelType, action) {
            map(state.taskPanelApps, item => item.isFocused = false);
            state.taskPanelApps[action.payload].isFocused = true;
        },
        changeLanguageIndex(state: TaskPanelType) {
            if(state.systemLanguageIndex >= 1){
                state.systemLanguageIndex = 0;
            }else{
                state.systemLanguageIndex += 1;
            }
        },
        handleInputModal(state: TaskPanelType) {
            state.searchInput.searchInputModalOpen = !state.searchInput.searchInputModalOpen;
        },
        handleInputValue(state: TaskPanelType, action) {
            state.searchInput.searchInputValue = action.payload;
        },
        handleHiddenAppsModal(state: TaskPanelType) {
            state.hiddenAppsModalOpen = !state.hiddenAppsModalOpen;
        },
        handleClickOutside(state: TaskPanelType) {
            state.hiddenAppsModalOpen = false;
            state.searchInput.searchInputModalOpen = false;
        },
    },
});

export default taskPanelSlice.reducer;
export const {
    openingApp,
    changeApp,
    changeLanguageIndex,
    handleInputModal,
    handleInputValue,
    handleHiddenAppsModal,
    handleClickOutside,
} = taskPanelSlice.actions;
