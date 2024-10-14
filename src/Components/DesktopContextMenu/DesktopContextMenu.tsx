import {
    DESKTOP_FILE_SIZE_UNIT,
    KEY_DOWN_EVENT,
    PLUS_CIRCLE,
    RIGHT_ARROW,
    SIZE_HOT_KEYS_MAP,
    TEXT_FILE,
    VIEW_BOXES,
} from "Constants/System";
import { useAppDispatch, useAppSelector } from "Store/index";
import { addDesktopFile } from "Store/slices/Desktop";
import cn from "classnames";

import styles from "./DesktopContextMenu.module.scss";
import Icon from "Components/Icon/Icon";
import { FOLDER } from "Constants/Desktop";
import { changeDesktopFileSize } from "Store/slices/System";
import { selectFileSize } from "Store/selectors/System";
import { useEffect } from "react";

type IProps = {
    contextMenuPosition: {
        x: number;
        y: number;
    };
    setContextMenuVisible: (state: boolean) => void;
    isFileMenu: boolean;
};

const DesktopContextMenu = ({
    contextMenuPosition,
    setContextMenuVisible,
    isFileMenu,
}: IProps) => {
    const dispatch = useAppDispatch();
    const selectedSize = useAppSelector(selectFileSize);
    const createNewFile =
        ({ name, type }: { name: string; type: string }) =>
        () => {
            const newFile = {
                name: name + `_${contextMenuPosition.x}`,
                icon: type,
                position: contextMenuPosition,
                isSelected: false,
                type,
                innerContent: [],
            };

            dispatch(addDesktopFile(newFile));
            setContextMenuVisible(false);
        };

    const onDesktopFileSizeChange = (newSize: {
        width: number;
        height: number;
    }) => {
        dispatch(changeDesktopFileSize(newSize));
    };

    const changeFileSizeByHotKey = (e: KeyboardEvent) => {
        if (
            e.ctrlKey &&
            e.shiftKey &&
            SIZE_HOT_KEYS_MAP[e.code as keyof typeof SIZE_HOT_KEYS_MAP]
        ) {
            onDesktopFileSizeChange(
                SIZE_HOT_KEYS_MAP[e.code as keyof typeof SIZE_HOT_KEYS_MAP],
            );
            setContextMenuVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener(
            KEY_DOWN_EVENT,
            changeFileSizeByHotKey as EventListener,
        );

        return () => {
            document.removeEventListener(
                KEY_DOWN_EVENT,
                changeFileSizeByHotKey as EventListener,
            );
        };
    });

    return (
        <div
            className={styles.contextMenu}
            style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
        >
            <div className={styles.menuItem}>
                <div className={styles.wrapper}>
                    <Icon name={VIEW_BOXES} className={styles.itemIcon} />
                    <div className={styles.itemName}>Вигляд</div>
                </div>
                <Icon
                    name={RIGHT_ARROW}
                    className={cn(styles.itemArrow, styles.itemIcon)}
                />
                <div className={styles.subMenu}>
                    {DESKTOP_FILE_SIZE_UNIT.map(
                        ({ size, name, iconName, hotKeys }) => {
                            const isSizeSelected =
                                size.height === selectedSize.height &&
                                size.width === selectedSize.width;

                            return (
                                <div
                                    key={name}
                                    className={styles.subMenuItem}
                                    onClick={() =>
                                        onDesktopFileSizeChange({
                                            width: size.width,
                                            height: size.height,
                                        })
                                    }
                                >
                                    <div className={styles.subMenuItemName}>
                                        <div className={styles.iconWrapper}>
                                            <Icon
                                                name={iconName}
                                                className={styles.sizeIcon}
                                            />
                                        </div>
                                        <div className={styles.sizeName}>
                                            {name}
                                        </div>
                                    </div>
                                    <div className={styles.hotKeys}>
                                        {hotKeys}
                                    </div>
                                    {isSizeSelected && (
                                        <div className={styles.sizeSelected} />
                                    )}
                                </div>
                            );
                        },
                    )}
                </div>
            </div>
            <div className={styles.menuItem}>
                <div className={styles.wrapper}>
                    <Icon name={PLUS_CIRCLE} className={styles.itemIcon} />
                    <div className={styles.itemName}>Створити</div>
                </div>
                <Icon
                    name={RIGHT_ARROW}
                    className={cn(styles.itemArrow, styles.itemIcon)}
                />
                <div className={styles.subMenu}>
                    <div
                        className={styles.subMenuItem}
                        onClick={createNewFile({
                            name: "Нова папка",
                            type: FOLDER,
                        })}
                    >
                        <div className={styles.iconWrapper}>
                            <Icon name={FOLDER} />
                        </div>

                        <div className={styles.subMenuItemName}>Папка</div>
                    </div>
                    <div
                        className={styles.subMenuItem}
                        onClick={createNewFile({
                            name: "Новий текстовий документ",
                            type: TEXT_FILE,
                        })}
                    >
                        <div className={styles.iconWrapper}>
                            <Icon name={TEXT_FILE} />
                        </div>
                        <div className={styles.subMenuItemName}>
                            Текстовий документ
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopContextMenu;
