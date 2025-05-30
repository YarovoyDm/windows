import React, { useState, useEffect } from "react";

import styles from "./Notification.module.scss";
import { CROSS } from "Constants/System";
import Icon from "Components/Icon/Icon";
import useLanguage from "Hooks/useLanguage";

type IProps = {
    delayBeforeShow?: number;
    duration?: number;
    text: string;
};

const Notification = ({ delayBeforeShow, duration, text }: IProps) => {
    const [visible, setVisible] = useState(true);
    const { translate } = useLanguage();

    useEffect(() => {
        setTimeout(() => setVisible(true), delayBeforeShow ?? 2000);
        const timer = setTimeout(() => setVisible(false), duration ?? 10000);

        return () => clearTimeout(timer);
    }, [delayBeforeShow, duration]);

    const closeNotification = () => setVisible(false);

    return (
        <div
            className={styles.wrapper}
            style={{
                transform: visible ? "translateX(0)" : "translateX(100%)",
                opacity: visible ? 1 : 0,
            }}
        >
            <header className={styles.header}>
                <div className={styles.title}>{translate("notification")}</div>
                <div
                    className={styles.closeButton}
                    onClick={() => closeNotification()}
                >
                    <Icon
                        name={CROSS}
                        style={{ width: "20px", height: "20px" }}
                    />
                </div>
            </header>
            <main className={styles.notification}>{text}</main>
        </div>
    );
};

export default Notification;
