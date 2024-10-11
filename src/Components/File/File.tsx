import React from "react";

import styles from "./File.module.scss";
import Icon from "Components/Icon/Icon";
import { useAppDispatch } from "Store/index";
import {
    addAppToTaskPanel,
    handleCloseAllModals,
} from "Store/slices/TaskPanelSlice";
import { FILE_ACTIONS } from "Constants/File";

type IFile = {
    name: string;
    text: string;
};

const File = ({ name, text }: IFile) => {
    const dispatch = useAppDispatch();

    const onFileModalChange = () => {
        dispatch(FILE_ACTIONS[name]);
        dispatch(handleCloseAllModals());
        dispatch(
            addAppToTaskPanel({
                name: name,
                component: <Icon name={name} />,
                isOpen: true,
                isFocused: true,
            }),
        );
    };

    return (
        <div className={styles.file} onClick={onFileModalChange}>
            <Icon name={name} />
            <div className={styles.fileName}>{text}</div>
        </div>
    );
};

export default File;
