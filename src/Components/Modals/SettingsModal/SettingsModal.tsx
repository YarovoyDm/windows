import React from "react";

import cn from "classnames";
import { Icon } from "Components";
import { CROSS } from "Constants/System";
import useDrag from "Hooks/useDrag";

import styles from "./SettingsModal.module.scss";
import {
    DEFAULT_DESKTOP_MODAL_POSITION,
    DEFAULT_DESKTOP_MODAL_SIZE,
} from "Constants/Desktop";

const SettingsModal = () => {
    const { position, handleMouseDown } = useDrag(
        DEFAULT_DESKTOP_MODAL_POSITION,
        DEFAULT_DESKTOP_MODAL_SIZE,
    );

    return (
        <div
            className={cn(styles.settings, "prevent-selecting")}
            style={{ position: "absolute", left: position.x, top: position.y }}
        >
            <div className={styles.header} onMouseDown={handleMouseDown}>
                <div className={styles.title}>Налаштування</div>
                <div className={styles.close}>
                    <Icon name={CROSS} />
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
