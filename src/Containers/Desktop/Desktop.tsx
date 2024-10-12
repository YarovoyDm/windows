import React, { useEffect, useRef, useState } from "react";
import styles from "./Desktop.module.scss";
import { useAppSelector, useAppDispatch } from "Store/index";
import { settingsModalState, selectFiles } from "Store/selectors/Desktop";
import { selectMultipleFiles, clearSelection } from "Store/slices/Desktop";
import DraggableDesktopFile from "Components/DraggableDesktopFile/DraggableDesktopFile";
import SettingsModal from "Components/Modals/SettingsModal/SettingsModal";
import { isFileInSelection } from "utils/IsFileInSelection";

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
    const dispatch = useAppDispatch();
    const selectedFiles = useAppSelector(state => state.desktop.selectedFiles);

    const handleMouseDown = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        const target = e.target as HTMLElement;

        if (!target.closest(".prevent-selecting")) {
            setIsSelecting(true);
            setStartPosition({ x: e.clientX, y: e.clientY });
            setCurrentPosition({ x: e.clientX, y: e.clientY });
            dispatch(clearSelection());
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isSelecting) return;

        const newPosition = { x: e.clientX, y: e.clientY };

        setCurrentPosition(newPosition);
        const footerOffset = 51;

        if (newPosition.y > window.innerHeight - footerOffset) {
            setCurrentPosition(prev => ({
                ...prev,
                y: window.innerHeight - footerOffset,
            }));
        }
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

    useEffect(() => {
        if (isSelecting) {
            const newSelectedFiles = desktopFiles
                .filter(({ position }) =>
                    isFileInSelection(
                        position,
                        { width: 80, height: 70 },
                        { startPosition, currentPosition },
                    ),
                )
                .map(({ name }) => name);

            dispatch(selectMultipleFiles(newSelectedFiles));
        }
    }, [currentPosition, isSelecting, desktopFiles, dispatch]);

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
            {desktopFiles.map(({ name, icon, position }) => (
                <DraggableDesktopFile
                    key={name}
                    name={name}
                    icon={icon}
                    filePosition={position}
                    setIsSelecting={setIsSelecting}
                    isSelected={selectedFiles.includes(name)}
                />
            ))}
            {isSettingsModalOpen && <SettingsModal />}
        </div>
    );
};

export default Desktop;
