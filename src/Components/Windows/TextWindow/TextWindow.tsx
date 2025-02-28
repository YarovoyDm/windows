import React, { useMemo, useState, useEffect } from "react";
import WindowBasic from "Components/Windows/WindowBasic/WindowBasic";
import {
    KEY_DOWN_EVENT,
    S_KEY_CODE,
    SHOW_SAVE_MESSAGE_DELAY,
} from "Constants/System";
import { useAppDispatch } from "Store/index";
import { closeWindow, updateFile } from "Store/slices/Desktop";

import styles from "./TextWindow.module.scss";
import { IFile } from "Types/Desktop";
import ConfirmationWithoutSaveModal from "Components/Modals/ConfirmationWithoutSaveModal/ConfirmationWithoutSaveModal";
import useLanguage from "Hooks/useLanguage";

const TextWindow = ({
    name,
    content,
    id,
}: {
    name: string;
    content: Array<IFile> | string;
    id: string;
}) => {
    const [fileValue, setFileValue] = useState(content);
    const [prevFileValue, setPrevFileValue] = useState(content);
    const [showSaveMessage, setShowSaveMessage] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const { translate } = useLanguage();

    const dispatch = useAppDispatch();
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
            showConfirmationModal && unsaveExit();

            setShowSaveMessage(true);

            setTimeout(() => {
                setShowSaveMessage(false);
            }, SHOW_SAVE_MESSAGE_DELAY);
        }
    };

    const unsaveExit = () => {
        dispatch(closeWindow(id));
        onConfirmationModalChange();
    };

    const onConfirmationModalChange = () => {
        setShowConfirmationModal(prev => !prev);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.code === S_KEY_CODE) {
                e.preventDefault();
                handleSave();
            }
        };

        window.addEventListener(KEY_DOWN_EVENT, handleKeyDown as EventListener);

        return () => {
            window.removeEventListener(
                KEY_DOWN_EVENT,
                handleKeyDown as EventListener,
            );
        };
    }, [fileValue, prevFileValue]);

    return (
        <WindowBasic
            name={name}
            id={id}
            onCloseCallback={isFileChanged && onConfirmationModalChange}
        >
            <div className={styles.textWindowWrapper}>
                {showConfirmationModal && (
                    <ConfirmationWithoutSaveModal
                        handleSave={handleSave}
                        unsaveExit={unsaveExit}
                        onConfirmationModalChange={onConfirmationModalChange}
                    />
                )}

                <textarea
                    value={typeof fileValue === "string" ? fileValue : ""}
                    onChange={e => onTextAreaChange(e)}
                />
                {showSaveMessage && (
                    <div className={styles.saveMessage}>
                        {translate("textFileWasSaved")}
                    </div>
                )}
                <div className={styles.footer}>
                    <div className={styles.filePath}>
                        C:\Users\Beast\Desktop\{name}.txt
                    </div>
                    <div className={styles.fileSettings}>
                        <div className={styles.settingItem}>
                            {isFileChanged &&
                                translate("textFileWasChangeMarker")}
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
