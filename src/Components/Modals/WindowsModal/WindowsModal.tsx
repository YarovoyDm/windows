import React from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import Icon from "Components/Icon/Icon";
import { USER, POWER, SETTINGS, CALCULATOR } from "Constants/TaskPanel";
import { handlePowerModal } from "Store/slices/TaskPanelSlice";
import File from "Components/File/File";

import { RootState, useAppDispatch } from "Store/index";

import styles from "./WindowsModal.module.scss";
import PowerModal from "../PowerModal/PowerModal";

const WindowsModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const store = useSelector((state: RootState) => state);
    const { isPowerModalOpen } = store.taskPanel;

    const onWindowsModalChange = () => {
        dispatch(handlePowerModal());
    };

    return (
        <div
            onClick={e => e.stopPropagation()}
            className={cn(styles.taskPanelWindowsModal, styles.taskPanelModal)}
        >
            <div className={styles.windowsModalMain}>
                <div className={styles.mainBlock}>
                    <div className={styles.unitHeader}>Закріплено</div>
                    <div className={styles.unitContent}>
                        <File name='Налаштування' icon={SETTINGS} />
                        <File name='Калькулятор' icon={CALCULATOR} />
                        {/* Need to refactoring */}
                    </div>
                </div>
                <div className={styles.mainBlock}>2</div>
            </div>
            <div className={styles.windowsModalFooter}>
                <div className={styles.footerUser}>
                    <div className={styles.userIconWrapper}>
                        <Icon name={USER} className={styles.userIcon} />
                    </div>
                    <div className={styles.userName}>Beast</div>
                </div>
                <div
                    onClick={onWindowsModalChange}
                    className={cn(
                        styles.footerPower,
                        isPowerModalOpen && styles.powerModalOpen,
                    )}
                >
                    {isPowerModalOpen && <PowerModal />}
                    <Icon name={POWER} className={styles.powerIcon} />
                </div>
            </div>
        </div>
    );
};

export default WindowsModal;
