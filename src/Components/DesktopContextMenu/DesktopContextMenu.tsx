import { TEXT_FILE } from "Constants/System";
import { useAppDispatch } from "Store/index";
import { addDesktopFile } from "Store/slices/Desktop";
import { IFile } from "Types/Desktop";

import styles from "./DesktopContextMenu.module.scss";

type IProps = {
    contextMenuPosition: {
        x: number;
        y: number;
    };
    files: Array<IFile>;
    setContextMenuVisible: (state: boolean) => void;
    isFileMenu: boolean;
};

const DesktopContextMenu = ({
    contextMenuPosition,
    files,
    setContextMenuVisible,
    isFileMenu,
}: IProps) => {
    const dispatch = useAppDispatch();

    const createTextFile = () => {
        const newFile = {
            name: `Новий текстовий документ`,
            icon: TEXT_FILE,
            position: contextMenuPosition,
            isSelected: false,
            type: TEXT_FILE,
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
                {isFileMenu ? (
                    <>
                        <li>Переіменувати</li>
                        <li>Опція 2 для файлів</li>
                    </>
                ) : (
                    <>
                        <li onClick={createTextFile}>
                            Створити текстовий документ
                        </li>
                        <li>Опція 2 для робочого столу</li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default DesktopContextMenu;
