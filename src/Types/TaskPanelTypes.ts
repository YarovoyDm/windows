import React from 'react';

export type ObjectOfModalRefs = {
    windows: React.MutableRefObject<null>,
    hiddenApps: React.MutableRefObject<null>,
    languages: React.MutableRefObject<null>,
};
export type TaskPanelType = {
    taskPanelApps: { [key: string]: { name: string, isOpen?: boolean, isFocused?: boolean, component: React.ReactElement } },
    systemLanguageIndex: number,
    searchInput: {
        searchInputValue: string,
        searchInputModalOpen: boolean,
    },
    hiddenAppsModalOpen: boolean,
    windowsModalOpen: boolean,
    systemPassword: number,
    isWindowsUnlock: boolean,
    isPowerModalOpen: boolean,
    isLanguagesModalOpen: boolean,
};

export type LanguagesType = {
    abbreviation: string,
    title: string,
    subTitle: string,
};