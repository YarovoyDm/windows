import { Icon } from "Components";
import { FILE_ACTIONS } from "Constants/File";
import { useAppDispatch } from "Store/index";
import {
    addAppToTaskPanel,
    handleCloseAllModals,
} from "Store/slices/TaskPanelSlice";

import styles from "./File.module.scss";

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
