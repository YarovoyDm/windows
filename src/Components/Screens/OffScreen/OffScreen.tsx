import React, { useEffect, useState } from "react";

import styles from "./OffScreen.module.scss";
import Icon from "Components/Icon/Icon";
import { POWER } from "Constants/System";

type IProps = {
    isStartScreen?: boolean;
    start?: () => void;
    isShutDownScreen?: boolean;
};

const OffScreen = ({ isStartScreen, start, isShutDownScreen }: IProps) => {
    const [isMessageShow, setIsMessageShow] = useState(false);
    const [executionCount, setExecutionCount] = useState(0);

    useEffect(() => {
        if (executionCount >= 2 || isStartScreen) return;

        const timer = setTimeout(() => {
            setIsMessageShow(prev => !prev);
            setExecutionCount(prev => prev + 1);
        }, 1500);

        return () => clearTimeout(timer);
    }, [isMessageShow, isStartScreen, executionCount]);

    const onSystemStart = () => {
        start && start();
    };

    return (
        <div className={styles.wrapper}>
            {isMessageShow && (
                <div className={styles.noSignal}>
                    <div className={styles.title}>HDMI 1</div>
                    <div className={styles.subTitle}>No signal</div>
                </div>
            )}
            {(isStartScreen || isShutDownScreen) && (
                <div
                    className={styles.powerButton}
                    onClick={() => onSystemStart()}
                >
                    <Icon name={POWER} />
                </div>
            )}
        </div>
    );
};

export default OffScreen;
