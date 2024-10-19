import React from "react";

import styles from "./TextWindow.module.scss";
import WindowBasic from "Components/WindowBasic/WindowBasic";

const TextWindow = ({ name }: { name: string }) => {
    return (
        <WindowBasic>
            <div className={styles.textWindowWrapper}>
                <textarea />
                <div className={styles.footer}>
                    <div className={styles.filePath}>
                        C:\Users\Beast\Desktop\{name}.txt
                    </div>
                    <div className={styles.fileSettings}>
                        <div className={styles.settingItem}>Windows (CRLF)</div>
                        <div className={styles.settingItem}>UTF-8</div>
                    </div>
                </div>
            </div>
        </WindowBasic>
    );
};

export default TextWindow;
