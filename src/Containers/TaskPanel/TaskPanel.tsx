import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import cn from "classnames";
import WindowsModal from "Components/Modals/WindowsModal/WindowsModal";
import { WINDOWS_KEY, WINDOWS } from "Constants/TaskPanel";
import { useClickOutside } from "Hooks/useClickOutside";
import Icon from "Components/Icon/Icon";
import {
    handleClickOutside,
    handleWindowsModal,
} from "Store/slices/TaskPanelSlice";
import { RootState, useAppDispatch } from "Store";
import { ObjectOfModalRefs } from "Types/TaskPanelTypes";

import styles from "./TaskPanel.module.scss";
import PinnedApps from "Components/PinnedApps/PinnedApps";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import TaskPanelSideBar from "Components/TaskPanelSideBar/TaskPanelSideBar";
import TaskPanelSearch from "Components/TaskPanelSearch/TaskPanelSearch";

const TaskPanel: React.FC = () => {
    const dispatch = useAppDispatch();
    const [currentModal, setCurrentModal] = useState<string>("");

    const refs: ObjectOfModalRefs = {
        windows: useRef(null),
        hiddenApps: useRef(null),
        languages: useRef(null),
    };

    const store = useSelector((state: RootState) => state);
    const {
        taskPanelApps,
        systemLanguageIndex,
        searchInput,
        hiddenAppsModalOpen,
        windowsModalOpen,
        isLanguagesModalOpen,
    } = store.taskPanel;

    useClickOutside(refs[currentModal as keyof typeof refs], () => {
        dispatch(handleClickOutside());
    });

    const handleModalChange = (
        modalKey: string,
        action: () =>
            | AnyAction
            | ThunkAction<void, RootState, unknown, AnyAction>,
    ) => {
        setCurrentModal(modalKey);
        dispatch(action());
    };

    return (
        <div className={styles.taskPanel}>
            <div
                ref={refs.windows}
                className={cn(
                    styles.taskPanelWindows,
                    windowsModalOpen && styles.windowsModalOpen,
                )}
                onClick={() =>
                    handleModalChange(WINDOWS_KEY, handleWindowsModal)
                }
                data-tooltip-content='Пуск'
                data-tooltip-id='taskPanelTooltips'
                data-tooltip-delay-show={500}
            >
                <Icon name={WINDOWS} className={styles.taskPanelWindowsIcon} />
                {windowsModalOpen && <WindowsModal />}
            </div>
            <TaskPanelSearch searchInput={searchInput} />
            <div className={styles.taskPanelAppWrapper}>
                <PinnedApps taskPanelApps={taskPanelApps} />
            </div>
            <TaskPanelSideBar
                hiddenAppsModalOpen={hiddenAppsModalOpen}
                isLanguagesModalOpen={isLanguagesModalOpen}
                handleModalChange={handleModalChange}
                systemLanguageIndex={systemLanguageIndex}
                refs={refs}
            />
        </div>
    );
};

export default TaskPanel;
