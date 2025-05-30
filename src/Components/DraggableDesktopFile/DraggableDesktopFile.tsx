import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { Icon } from "Components";
import {
    DELETE_KEY_CODE,
    ENTER_KEY_CODE,
    KEY_DOWN_EVENT,
    MOUSE_DOWN_EVENT,
    MOUSE_MOVE_EVENT,
    MOUSE_UP_EVENT,
} from "Constants/System";
import useDrag from "Hooks/useDrag";
import { useAppDispatch, useAppSelector } from "Store/index";
import {
    changeFilePosition,
    dragFileToFolder,
    openWindow,
    removeFile,
} from "Store/slices/Desktop";
import {
    selectFileSelectionColor,
    selectFileSize,
} from "Store/selectors/System";
import { IFile } from "Types/Desktop";

import styles from "./DraggableDesktopFile.module.scss";
import useLanguage from "Hooks/useLanguage";

interface IProps extends IFile {
    setIsSelecting: (isSelecting: boolean) => void;
    onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const DraggableDesktopFile = ({
    name,
    icon,
    position: filePosition,
    setIsSelecting,
    isSelected,
    onContextMenu,
    isOpened,
    innerContent,
    id,
    type,
}: IProps) => {
    const [isFileSelected, setIsFileSelected] = useState<boolean>(isSelected);
    const [targetFolderName, setTargetFolderName] = useState<string>("");
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const fileRef = useRef<HTMLDivElement | null>(null);
    const fileSelectionColor = useAppSelector(selectFileSelectionColor);

    const selectedSize = useAppSelector(selectFileSize);
    const dispatch = useAppDispatch();
    const { position, handleMouseDown } = useDrag(filePosition, selectedSize);
    const { translate } = useLanguage();

    const handleClickFileOutside = (e: MouseEvent) => {
        if (fileRef.current && !fileRef.current.contains(e.target as Node)) {
            setIsFileSelected(false);
        }
    };

    const detectKeyDown = (e: KeyboardEvent) => {
        if (e.code === DELETE_KEY_CODE) {
            dispatch(removeFile(name));
        }
        if (e.key === ENTER_KEY_CODE && isFileSelected) {
            openFile();
            setIsFileSelected(false);
        }
    };

    const openFile = () => {
        if (!isOpened) {
            dispatch(
                openWindow({
                    zIndex: 999,
                    content: innerContent,
                    fileName: name,
                    id,
                    type,
                }),
            );
        }
    };

    useEffect(() => {
        dispatch(changeFilePosition({ name, position }));
    }, [position]);

    useEffect(() => {
        if (isFileSelected) {
            document.addEventListener(
                KEY_DOWN_EVENT,
                detectKeyDown as EventListener,
            );
        }

        return () => {
            document.removeEventListener(
                KEY_DOWN_EVENT,
                detectKeyDown as EventListener,
            );
        };
    }, [isFileSelected]);

    const checkDropTarget = () => {
        const file = fileRef.current;

        if (!file) return;

        const folders = document.querySelectorAll<HTMLDivElement>(
            "[data-file='folder']",
        );

        let folderFound = false;

        folders.forEach(folder => {
            const folderRect = folder.getBoundingClientRect();
            const fileRect = file.getBoundingClientRect();

            if (
                fileRect.left < folderRect.right &&
                fileRect.right > folderRect.left &&
                fileRect.top < folderRect.bottom &&
                fileRect.bottom > folderRect.top &&
                id !== folder.dataset.id
            ) {
                setTargetFolderName(folder.dataset.name || "");
                folderFound = true;
            }
        });

        if (!folderFound) {
            setTargetFolderName("");
        }
    };

    useEffect(() => {
        if (targetFolderName && !isDragging) {
            dispatch(
                dragFileToFolder({
                    fileName: name,
                    folderName: targetFolderName,
                }),
            );
            setTargetFolderName("");
        }
    }, [targetFolderName, isDragging, name, dispatch]);

    const handleMouseUp = () => {
        if (isDragging) {
            setIsDragging(false);
        }
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener(MOUSE_UP_EVENT, handleMouseUp);
            document.addEventListener(MOUSE_MOVE_EVENT, checkDropTarget);
        }

        document.addEventListener(
            MOUSE_DOWN_EVENT,
            handleClickFileOutside as EventListener,
        );

        return () => {
            document.removeEventListener(MOUSE_UP_EVENT, handleMouseUp);
            document.removeEventListener(MOUSE_MOVE_EVENT, checkDropTarget);
            document.removeEventListener(
                MOUSE_DOWN_EVENT,
                handleClickFileOutside as EventListener,
            );
        };
    }, [isDragging]);

    useEffect(() => {
        setIsFileSelected(isSelected);
    }, [isSelected]);

    return (
        <div
            onMouseDown={e => {
                handleMouseDown(e);
                setIsFileSelected(true);
                setIsSelecting(false);
                setIsDragging(true);
            }}
            onDoubleClick={openFile}
            ref={fileRef}
            data-file={type}
            data-id={id}
            data-name={name}
            onContextMenu={onContextMenu}
            className={cn(styles.file, "prevent-selecting")}
            style={{
                width: selectedSize?.width,
                height: selectedSize?.height,
                top: `${position.y}px`,
                left: `${position.x}px`,
                position: "absolute",
                zIndex: isFileSelected ? 999 : 1,
                background: (isFileSelected && fileSelectionColor) || "",
            }}
        >
            <Icon
                name={icon}
                data-file={type}
                data-id={id}
                data-name={name}
                style={{
                    width: selectedSize.width / 2,
                    height: selectedSize.height / 2,
                }}
            />
            <div className={styles.fileName}>{name}</div>
            {isDragging && targetFolderName && (
                <div className={styles.tooltip}>
                    {translate("moveTo")} {targetFolderName}
                </div>
            )}
        </div>
    );
};

export default DraggableDesktopFile;
