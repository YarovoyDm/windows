import React from "react";
import cn from "classnames";
import { Icon, File } from "Components";
import { CALCULATOR, POWER, SETTINGS, USER } from "Constants/System";
import { toggleModal } from "Store/slices/TaskPanelSlice";
import { useAppDispatch, useAppSelector } from "Store/index";
import PowerModal from "../PowerModal/PowerModal";

import styles from "./WindowsModal.module.scss";
import { selectPowerModalState } from "Store/selectors/TaskPanel";

const WindowsModal = () => {
    const dispatch = useAppDispatch();
    const isPowerModalOpen = useAppSelector(selectPowerModalState);

    const onWindowsModalChange = () => {
        dispatch(toggleModal({ modalName: "isPowerModalOpen" }));
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
                        <File text='Налаштування' name={SETTINGS} />
                        <File text='Калькулятор' name={CALCULATOR} />
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
