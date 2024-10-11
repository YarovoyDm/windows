import React, { useEffect, useRef, useState } from "react";

import styles from "./DraggableDesktopFile.module.scss";
import cn from "classnames";
import Icon from "Components/Icon/Icon";
import { useAppDispatch } from "Store/index";
import { removeFile } from "Store/slices/Desktop";

type Position = {
    x: number;
    y: number;
};

type IFile = {
    name: string;
    icon: string;
    filePosition: { x: number; y: number };
    setIsSelecting: (isSelecting: boolean) => void;
};

const DraggableDesktopFile = ({
    name,
    icon,
    filePosition,
    setIsSelecting,
}: IFile) => {
    const dispatch = useAppDispatch();
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [position, setPosition] = useState<Position>({
        x: filePosition.x,
        y: filePosition.y,
    });
    const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const fileRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        e.preventDefault();
        setIsDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });

        setIsSelected(true);
        setIsSelecting(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();

        let newX = e.clientX - offset.x;
        let newY = e.clientY - offset.y;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const folderWidth = 80;
        const folderHeight = 70;

        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;
        if (newX + folderWidth > windowWidth) newX = windowWidth - folderWidth;
        if (newY + (folderHeight + 51) > windowHeight)
            newY = windowHeight - (folderHeight + 51);

        setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (fileRef.current && !fileRef.current.contains(e.target as Node)) {
            setIsSelected(false);
        }
    };

    const detectKeyDown = (e: KeyboardEvent) => {
        if (e.code === "Delete") {
            dispatch(removeFile(name));
        }
    };

    useEffect(() => {
        if (isSelected) {
            document.addEventListener("keydown", detectKeyDown, true);
        }

        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("keydown", detectKeyDown, true);
        };
    }, [isDragging, isSelected]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            onMouseDown={handleMouseDown}
            ref={fileRef}
            data-file='true'
            className={cn(styles.file, "desktop-file", {
                [styles.selected]: isSelected,
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
