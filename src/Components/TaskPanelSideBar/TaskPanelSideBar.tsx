import React from "react";
import cn from "classnames";
import { HiddenAppsModal, LanguagesModal } from "Components/Modals";
import { Icon } from "Components";
import { ARROW, LANGUAGES } from "Constants/System";
import { ModalNames, ObjectOfModalRefs } from "Types/TaskPanelTypes";

import styles from "./TaskPanelSideBar.module.scss";

const TaskPanelSideBar = ({
    hiddenAppsModalOpen,
    isLanguagesModalOpen,
    systemLanguageIndex,
    refs,
    handleModalChange,
}: {
    hiddenAppsModalOpen: boolean;
    isLanguagesModalOpen: boolean;
    systemLanguageIndex: number;
    refs: ObjectOfModalRefs;
    handleModalChange: (name: ModalNames) => void;
}) => {
    return (
        <div className={styles.taskPanelSidebar}>
            <div
                ref={refs.isHiddenAppsModalOpen}
                className={cn(
                    styles.taskPanelSidebarUnit,
                    hiddenAppsModalOpen && styles.hiddenAppOpen,
                )}
                onClick={() => handleModalChange("isHiddenAppsModalOpen")}
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
                ref={refs.isLanguagesModalOpen}
                className={cn(
                    styles.taskPanelSidebarUnit,
                    isLanguagesModalOpen && styles.languagesModalOpen,
                )}
                onClick={() => handleModalChange("isLanguagesModalOpen")}
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
