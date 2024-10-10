import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import Icon from "Components/Icon/Icon";
import { USER, POWER, SLEEP, RELOAD } from "Constants/TaskPanel";
import { handlePowerModal } from "Reducers/TaskPanelReducer";

import { AppDispatch, RootState } from "Reducers/index";

import styles from "./WindowsModal.module.scss";

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
                    {isPowerModalOpen && (
                        <div
                            onClick={e => e.stopPropagation()}
                            className={cn(
                                styles.powerModal,
                                styles.taskPanelModal,
                            )}
                        >
                            <div className={styles.powerModalUnit}>
                                <Icon
                                    name={SLEEP}
                                    className={styles.modalUnitIcon}
                                />
                                <div className={styles.modalUnitText}>Сон</div>
                            </div>
                            <div className={styles.powerModalUnit}>
                                <Icon
                                    name={RELOAD}
                                    className={styles.modalUnitIcon}
                                />
                                <div className={styles.modalUnitText}>
                                    Перезавантажити
                                </div>
                            </div>
                            <div className={styles.powerModalUnit}>
                                <Icon
                                    name={POWER}
                                    className={styles.modalUnitIcon}
                                />
                                <div className={styles.modalUnitText}>
                                    Завершити роботу
                                </div>
                            </div>
                        </div>
                    )}
                    <Icon name={POWER} className={styles.powerIcon} />
                </div>
            </div>
        </div>
    );
};

export default WindowsModal;
