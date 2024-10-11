import React from "react";
import styles from "./SettingsModal.module.scss";
import cn from "classnames";
import { CROSS } from "Constants/TaskPanel";
import Icon from "Components/Icon/Icon";
import useDrag from "Hooks/useDrag";

const SettingsModal = () => {
    const { position, handleMouseDown } = useDrag(
        { x: 100, y: 100 },
        {
            width: 700,
            height: 500,
        },
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
