import React, { useMemo, useState, useEffect } from "react";

import styles from "./TextWindow.module.scss";
import WindowBasic from "Components/WindowBasic/WindowBasic";
import { useAppDispatch } from "Store/index";
import { updateFile } from "Store/slices/Desktop";

const TextWindow = ({
    name,
    content,
    id,
}: {
    name: string;
    content: string;
    id: string;
}) => {
    const dispatch = useAppDispatch();
    const [fileValue, setFileValue] = useState(content);
    const [prevFileValue, setPrevFileValue] = useState(content);
    const [showSaveMessage, setShowSaveMessage] = useState(false);
    const [showConfirmationWindow, setShowConfirmationWindow] = useState(false);
    const isFileChanged = useMemo(
        () => fileValue !== prevFileValue,
        [fileValue, prevFileValue],
    );

    const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFileValue(e.currentTarget.value);
    };

    const handleSave = () => {
        if (isFileChanged) {
            setPrevFileValue(fileValue);
            dispatch(updateFile({ id, newValue: fileValue }));

            setShowSaveMessage(true);

            setTimeout(() => {
                setShowSaveMessage(false);
            }, 2000);
        }
    };

    const onConfirmationWindowChange = () => {
        setShowConfirmationWindow(true);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "s") {
                e.preventDefault();
                handleSave();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [fileValue, prevFileValue]);

    return (
        <WindowBasic
            name={name}
            id={id}
            onCloseCallback={onConfirmationWindowChange}
        >
            <div className={styles.textWindowWrapper}>
                {showConfirmationWindow && (
                    <div className={styles.confirmation}>
                        <div className={styles.confirmationWindow}>
                            <div className={styles.confirmationTitle}>
                                Хочете зберегти зміни?
                            </div>
                            <div className={styles.confirmationSubTitle}>
                                У вас є незбережені зміни.
                            </div>
                            <div className={styles.confirmationButtons}>
                                <button onClick={handleSave}>Зберегти</button>
                                <button>Не зберігати</button>
                                <button>Скасувати</button>
                            </div>
                        </div>
                    </div>
                )}

                <textarea
                    value={fileValue}
                    onChange={e => onTextAreaChange(e)}
                />
                {showSaveMessage && (
                    <div className={styles.saveMessage}>Збережено</div>
                )}
                <div className={styles.footer}>
                    <div className={styles.filePath}>
                        C:\Users\Beast\Desktop\{name}.txt
                    </div>
                    <div className={styles.fileSettings}>
                        <div className={styles.settingItem}>
                            {isFileChanged && "Змінено"}
                        </div>
                        <div className={styles.settingItem}>Windows (CRLF)</div>
                        <div className={styles.settingItem}>UTF-8</div>
                    </div>
                </div>
            </div>
        </WindowBasic>
    );
};

export default TextWindow;
