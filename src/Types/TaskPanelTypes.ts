import React from "react";

export type ObjectOfModalRefs = {
    isWindowsModalOpen: React.MutableRefObject<null>;
    isHiddenAppsModalOpen: React.MutableRefObject<null>;
    isLanguagesModalOpen: React.MutableRefObject<null>;
};
export type TaskPanelType = {
    taskPanelApps: {
        [key: string]: {
            name: string;
            isOpen?: boolean;
            isFocused?: boolean;
            component: React.ReactElement;
        };
    };
    systemLanguageIndex: number;
    isHiddenAppsModalOpen: boolean;
    isWindowsModalOpen: boolean;
    systemPassword: number;
    isWindowsUnlock: boolean;
    isPowerModalOpen: boolean;
    isLanguagesModalOpen: boolean;
};

export type LanguagesType = {
    abbreviation: string;
    title: string;
    subTitle: string;
};

export type ModalNames =
    | "isHiddenAppsModalOpen"
    | "isWindowsModalOpen"
    | "isPowerModalOpen"
    | "isLanguagesModalOpen";

export interface ToggleModalPayload {
    modalName: ModalNames;
}
