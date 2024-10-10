import React, { useEffect, useRef, useState } from "react";

import styles from "./DraggableDesktopItem.module.scss";
import cn from "classnames";
import Icon from "Components/Icon/Icon";
import { TEXT_FILE } from "Constants/TaskPanel";

type Position = {
    x: number;
    y: number;
};

const DraggableDesktopItem = () => {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [position, setPosition] = useState<Position>({ x: 50, y: 50 });
    const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const folderRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });

        setIsSelected(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;

        let newX = e.clientX - offset.x;
        let newY = e.clientY - offset.y;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const folderWidth = 100;
        const folderHeight = 100;

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
        if (
            folderRef.current &&
            !folderRef.current.contains(e.target as Node)
        ) {
            setIsSelected(false);
        }
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            onMouseDown={handleMouseDown}
            ref={folderRef}
            className={cn(styles.file, { [styles.selected]: isSelected })}
            style={{
                top: `${position.y}px`,
                left: `${position.x}px`,
                position: "absolute",
            }}
        >
            <Icon name={TEXT_FILE} />
            <div className={styles.fileName}>Read me!</div>
        </div>
    );
};

export default DraggableDesktopItem;
