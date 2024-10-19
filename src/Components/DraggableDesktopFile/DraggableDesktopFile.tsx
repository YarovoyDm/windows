import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { Icon } from "Components";
import {
    DELETE_KEY_CODE,
    KEY_DOWN_EVENT,
    MOUSE_DOWN_EVENT,
} from "Constants/System";
import useDrag from "Hooks/useDrag";
import { useAppDispatch, useAppSelector } from "Store/index";
import { changeFilePosition, removeFile } from "Store/slices/Desktop";

import styles from "./DraggableDesktopFile.module.scss";
import { selectFileSize } from "Store/selectors/System";

type IFile = {
    name: string;
    icon: string;
    filePosition: { x: number; y: number };
    setIsSelecting: (isSelecting: boolean) => void;
    isSelected: boolean;
    onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const DraggableDesktopFile = ({
    name,
    icon,
    filePosition,
    setIsSelecting,
    isSelected,
    onContextMenu,
}: IFile) => {
    const dispatch = useAppDispatch();
    const fileRef = useRef<HTMLDivElement>(null);
    const [isFileSelected, setIsFileSelected] = useState(isSelected);
    const selectedSize = useAppSelector(selectFileSize);

    const { position, handleMouseDown } = useDrag(filePosition, selectedSize);

    const handleClickFileOutside = (e: MouseEvent) => {
        if (fileRef.current && !fileRef.current.contains(e.target as Node)) {
            setIsFileSelected(false);
        }
    };

    const detectKeyDown = (e: KeyboardEvent) => {
        if (e.code === DELETE_KEY_CODE) {
            dispatch(removeFile(name));
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
                true,
            );
        }

        return () => {
            document.removeEventListener(
                KEY_DOWN_EVENT,
                detectKeyDown as EventListener,
                true,
            );
        };
    }, [isFileSelected]);

    useEffect(() => {
        document.addEventListener(
            MOUSE_DOWN_EVENT,
            handleClickFileOutside as EventListener,
        );

        return () => {
            document.removeEventListener(
                MOUSE_DOWN_EVENT,
                handleClickFileOutside as EventListener,
            );
        };
    }, []);

    useEffect(() => {
        setIsFileSelected(isSelected);
    }, [isSelected]);

    return (
        <div
            onMouseDown={e => {
                handleMouseDown(e);
                setIsFileSelected(true);
                setIsSelecting(false);
            }}
            ref={fileRef}
            data-file='true'
            onContextMenu={onContextMenu}
            className={cn(styles.file, "prevent-selecting", {
                [styles.selected]: isFileSelected,
            })}
            style={{
                width: selectedSize?.width,
                height: selectedSize?.height,
                top: `${position.y}px`,
                left: `${position.x}px`,
                position: "absolute",
            }}
        >
            <Icon
                name={icon}
                style={{
                    width: selectedSize.width / 2,
                    height: selectedSize.height / 2,
                }}
            />
            <div className={styles.fileName}>{name}</div>
        </div>
    );
};

export default DraggableDesktopFile;
