import { ReactNode } from "react";
import styles from "./BlockBasic.module.scss";

export const BlockBasic = ({
    header,
    children,
}: {
    header: string;
    children: ReactNode;
}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>{header}</div>
            <div className={styles.main}>{children}</div>
        </div>
    );
};
