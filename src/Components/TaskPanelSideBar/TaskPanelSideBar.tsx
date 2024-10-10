import React from "react";
import cn from "classnames";
import styles from "./TaskPanelSideBar.module.scss";
import {
    ARROW,
    HIDDEN_APPS_KEY,
    LANGUAGES,
    LANGUAGES_KEY,
} from "Constants/TaskPanel";
import HiddenAppsModal from "Components/Modals/HiddenAppsModal/HiddenAppsModal";
import Icon from "Components/Icon/Icon";
import LanguagesModal from "Components/Modals/LanguagesModal/LanguagesModal";
import {
    handleHiddenAppsModal,
    handleLanguagesModal,
} from "Store/slices/TaskPanelSlice";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "Store/index";
import { ObjectOfModalRefs } from "Types/TaskPanelTypes";

const TaskPanelSideBar = ({
    hiddenAppsModalOpen,
    isLanguagesModalOpen,
    handleModalChange,
    systemLanguageIndex,
    refs,
}: {
    hiddenAppsModalOpen: boolean;
    isLanguagesModalOpen: boolean;
    handleModalChange: (
        modalKey: string,
        action: () =>
            | AnyAction
            | ThunkAction<void, RootState, unknown, AnyAction>,
    ) => void;
    systemLanguageIndex: number;
    refs: ObjectOfModalRefs;
}) => {
    return (
        <div className={styles.taskPanelSidebar}>
            <div
                ref={refs.hiddenApps}
                className={cn(
                    styles.taskPanelSidebarUnit,
                    hiddenAppsModalOpen && styles.hiddenAppOpen,
                )}
                onClick={() =>
                    handleModalChange(HIDDEN_APPS_KEY, handleHiddenAppsModal)
                }
                data-tooltip-content='Відображати приховані піктограми'
                data-tooltip-id='taskPanelTooltips'
                data-tooltip-delay-show={500}
            >
                {hiddenAppsModalOpen && <HiddenAppsModal />}
                <Icon
                    name={ARROW}
                    className={cn(
                        styles.collapseArrow,
                        hiddenAppsModalOpen && styles.collapseArrowRotate,
                    )}
                />
            </div>
            <div
                ref={refs.languages}
                className={cn(
                    styles.taskPanelSidebarUnit,
                    isLanguagesModalOpen && styles.languagesModalOpen,
                )}
                onClick={() =>
                    handleModalChange(LANGUAGES_KEY, handleLanguagesModal)
                }
                data-tooltip-content='Щоб змінити метод вводу, натисніть сполучення клавіш shift + alt'
                data-tooltip-id='taskPanelTooltips'
                data-tooltip-delay-show={500}
            >
                {isLanguagesModalOpen && <LanguagesModal />}
                {LANGUAGES[systemLanguageIndex].abbreviation}
            </div>
            <div className={styles.taskPanelSidebarUnit}></div>
            <div className={styles.taskPanelSidebarUnit}></div>
        </div>
    );
};

export default TaskPanelSideBar;
