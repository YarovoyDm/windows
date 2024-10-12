import React from "react";

import styles from "./DesktopContextMenu.module.scss";
import { TEXT_FILE } from "Constants/TaskPanel";
import { useAppDispatch } from "Store/index";
import { addDesktopFile } from "Store/slices/Desktop";
import { IFile } from "Types/Desktop";

type IProps = {
    contextMenuPosition: {
        x: number;
        y: number;
    };
    files: Array<IFile>;
    setContextMenuVisible: (state: boolean) => void;
};

const DesktopContextMenu = ({
    contextMenuPosition,
    files,
    setContextMenuVisible,
}: IProps) => {
    const dispatch = useAppDispatch();

    const createTextFile = () => {
        const newFile = {
            name: `Новий текстовий документ ${files.length + 1}`,
            icon: TEXT_FILE,
            position: contextMenuPosition,
            isSelected: false,
            type: "text_file",
            innerContent: [],
        };

        dispatch(addDesktopFile(newFile));
        setContextMenuVisible(false);
    };

    return (
        <div
            className={styles.contextMenu}
            style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
        >
            <ul>
                <li onClick={createTextFile}>Створити текстовий документ</li>
                <li>Опція 2</li>
                <li>Опція 3</li>
            </ul>
        </div>
    );
};

export default DesktopContextMenu;
