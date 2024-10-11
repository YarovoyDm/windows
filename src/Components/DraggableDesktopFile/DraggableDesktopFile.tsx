import React, { useEffect, useRef, useState } from "react";
import styles from "./DraggableDesktopFile.module.scss";
import cn from "classnames";
import Icon from "Components/Icon/Icon";
import { useAppDispatch } from "Store/index";
import { removeFile } from "Store/slices/Desktop";
import useDrag from "Hooks/useDrag";

type IFile = {
    name: string;
    icon: string;
    filePosition: { x: number; y: number };
    setIsSelecting: (isSelecting: boolean) => void;
    isSelected: boolean;
};

const DraggableDesktopFile = ({
    name,
    icon,
    filePosition,
    setIsSelecting,
    isSelected,
}: IFile) => {
    const dispatch = useAppDispatch();
    const fileRef = useRef<HTMLDivElement>(null);
    const [isFileSelected, setIsFileSelected] = useState(isSelected);
    const { position, handleMouseDown } = useDrag(filePosition, {
        width: 80,
        height: 70,
    });

    const handleClickOutside = (e: MouseEvent) => {
        if (fileRef.current && !fileRef.current.contains(e.target as Node)) {
            setIsFileSelected(false);
        }
    };

    const detectKeyDown = (e: KeyboardEvent) => {
        if (e.code === "Delete") {
            dispatch(removeFile(name));
        }
    };

    useEffect(() => {
        if (isFileSelected) {
            document.addEventListener("keydown", detectKeyDown, true);
        }

        return () => {
            document.removeEventListener("keydown", detectKeyDown, true);
        };
    }, [isFileSelected]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
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
            className={cn(styles.file, "prevent-selecting", {
                [styles.selected]: isFileSelected,
            })}
            style={{
                top: `${position.y}px`,
                left: `${position.x}px`,
                position: "absolute",
            }}
        >
            <Icon name={icon} />
            <div className={styles.fileName}>{name}</div>
        </div>
    );
};

export default DraggableDesktopFile;
