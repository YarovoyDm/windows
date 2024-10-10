import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import Icon from "Components/Icon/Icon";
import { USER, POWER, SLEEP, RELOAD } from "Constants/TaskPanel";
import { handlePowerModal } from "Store/slices/TaskPanelSlice";

import { AppDispatch, RootState } from "Store/index";

import styles from "./WindowsModal.module.scss";
import PowerModal from "../PowerModal/PowerModal";

const WindowsModal: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
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
            <div className={styles.windowsModalMain}>1</div>
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
