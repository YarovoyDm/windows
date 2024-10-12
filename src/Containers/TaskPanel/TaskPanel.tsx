import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import WindowsModal from "Components/Modals/WindowsModal/WindowsModal";
import { WINDOWS } from "Constants/TaskPanel";
import { useClickOutside } from "Hooks/useClickOutside";
import Icon from "Components/Icon/Icon";
import { handleCloseAllModals, toggleModal } from "Store/slices/TaskPanelSlice";
import { RootState, useAppDispatch } from "Store";
import { ModalNames, ObjectOfModalRefs } from "Types/TaskPanelTypes";

import styles from "./TaskPanel.module.scss";
import PinnedApps from "Components/PinnedApps/PinnedApps";
import TaskPanelSideBar from "Components/TaskPanelSideBar/TaskPanelSideBar";
import TaskPanelSearch from "Components/TaskPanelSearch/TaskPanelSearch";

const TaskPanel: React.FC = () => {
    const dispatch = useAppDispatch();
    const [currentModal, setCurrentModal] = useState<string>("");

    const refs: ObjectOfModalRefs = {
        isWindowsModalOpen: useRef(null),
        isHiddenAppsModalOpen: useRef(null),
        isLanguagesModalOpen: useRef(null),
    };

    const store = useSelector((state: RootState) => state);
    const {
        taskPanelApps,
        systemLanguageIndex,
        isHiddenAppsModalOpen,
        isWindowsModalOpen,
        isLanguagesModalOpen,
    } = store.taskPanel;

    useClickOutside(refs[currentModal as keyof typeof refs], () => {
        dispatch(handleCloseAllModals());
    });

    const handleModalChange = (name: ModalNames) => {
        setCurrentModal(name);
        dispatch(toggleModal({ modalName: name }));
    };

    return (
        <div className={styles.taskPanel}>
            <div
                ref={refs.isWindowsModalOpen}
                className={cn(
                    styles.taskPanelWindows,
                    isWindowsModalOpen && styles.windowsModalOpen,
                )}
                onClick={() => handleModalChange("isWindowsModalOpen")}
                data-tooltip-content='Пуск'
                data-tooltip-id='taskPanelTooltips'
                data-tooltip-delay-show={500}
            >
                <Icon name={WINDOWS} className={styles.taskPanelWindowsIcon} />
                {isWindowsModalOpen && <WindowsModal />}
            </div>
            <TaskPanelSearch />
            <div className={styles.taskPanelAppWrapper}>
                <PinnedApps taskPanelApps={taskPanelApps} />
            </div>
            <TaskPanelSideBar
                hiddenAppsModalOpen={isHiddenAppsModalOpen}
                isLanguagesModalOpen={isLanguagesModalOpen}
                handleModalChange={handleModalChange}
                systemLanguageIndex={systemLanguageIndex}
                refs={refs}
            />
        </div>
    );
};

export default TaskPanel;
