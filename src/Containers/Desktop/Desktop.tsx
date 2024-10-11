import React, { useEffect, useRef, useState } from "react";

import styles from "./Desktop.module.scss";

import { useAppSelector } from "Store/index";
import { settingsModalState, selectFiles } from "Store/selectors/Desktop";
import DraggableDesktopFile from "Components/DraggableDesktopFile/DraggableDesktopFile";
import SettingsModal from "Components/Modals/SettingsModal/SettingsModal";

type Position = {
    x: number;
    y: number;
};

const Desktop = () => {
    const [isSelecting, setIsSelecting] = useState<boolean>(false);
    const [startPosition, setStartPosition] = useState<Position>({
        x: 0,
        y: 0,
    });
    const [currentPosition, setCurrentPosition] = useState<Position>({
        x: 0,
        y: 0,
    });
    const selectionRef = useRef<HTMLDivElement>(null);
    const desktopFiles = useAppSelector(selectFiles);
    const isSettingsModalOpen = useAppSelector(settingsModalState);

    const handleMouseDown = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        const target = e.target as HTMLElement;

        if (!target.closest(".prevent-selecting")) {
            setIsSelecting(true);
            setStartPosition({ x: e.clientX, y: e.clientY });
            setCurrentPosition({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isSelecting) return;
        setCurrentPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
    };

    useEffect(() => {
        if (isSelecting) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isSelecting]);

    const getSelectionStyles = () => {
        const width = Math.abs(currentPosition.x - startPosition.x - 1);
        const height = Math.abs(currentPosition.y - startPosition.y);
        const left = Math.min(startPosition.x, currentPosition.x);
        const top = Math.min(startPosition.y, currentPosition.y);

        return {
            width: `${width}px`,
            height: `${height}px`,
            left: `${left}px`,
            top: `${top}px`,
        };
    };

    return (
        <div className={styles.Desktop} onMouseDown={handleMouseDown}>
            {isSelecting && (
                <div
                    ref={selectionRef}
                    className={styles.selection}
                    style={getSelectionStyles()}
                />
            )}
            {desktopFiles.map(({ name, icon, position }) => {
                return (
                    <DraggableDesktopFile
                        key={name}
                        name={name}
                        icon={icon}
                        filePosition={position}
                        setIsSelecting={setIsSelecting}
                    />
                );
            })}
            {isSettingsModalOpen && (
                <SettingsModal setIsSelecting={setIsSelecting} />
            )}
        </div>
    );
};

export default Desktop;
