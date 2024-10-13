import React, { useEffect, useRef, useState } from "react";
import { DraggableDesktopFile, DesktopContextMenu } from "Components";
import { SettingsModal } from "Components/Modals";
import { DEFAULT_DESKTOP_CONTEXT_MENU_WIDTH } from "Constants/Desktop";
import { DESKTOP_FILE_SIZE } from "Constants/File";
import {
    CLICK_EVENT,
    MOUSE_MOVE_EVENT,
    MOUSE_UP_EVENT,
    ZERO_POSITION,
} from "Constants/System";
import { useAppSelector, useAppDispatch } from "Store/index";
import { selectSettingsModalState, selectFiles } from "Store/selectors/Desktop";
import { selectMultipleFiles, clearSelection } from "Store/slices/Desktop";
import { isFileInSelection } from "utils/IsFileInSelection";

import styles from "./Desktop.module.scss";

type Position = {
    x: number;
    y: number;
};

const Desktop = () => {
    const [isSelecting, setIsSelecting] = useState<boolean>(false);
    const [startPosition, setStartPosition] = useState<Position>(ZERO_POSITION);
    const [currentPosition, setCurrentPosition] =
        useState<Position>(ZERO_POSITION);
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] =
        useState<Position>(ZERO_POSITION);
    const [isFile, setIsFile] = useState(false);

    const dispatch = useAppDispatch();
    const selectionRef = useRef<HTMLDivElement>(null);

    const desktopFiles = useAppSelector(selectFiles);
    const isSettingsModalOpen = useAppSelector(selectSettingsModalState);
    const selectedFiles = useAppSelector(state => state.desktop.selectedFiles);

    const handleContextMenu = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        if (e.button === 2) {
            e.preventDefault();

            const target = e.target as HTMLElement;
            const isFileClicked = target.closest('[data-file="true"]') !== null;

            setIsFile(isFileClicked);

            const menuWidth = DEFAULT_DESKTOP_CONTEXT_MENU_WIDTH;

            let x = e.clientX;
            let y = e.clientY;

            if (x + menuWidth > window.innerWidth) {
                x = e.clientX - menuWidth;
            }

            setContextMenuPosition({ x, y });
            setContextMenuVisible(true);
        }
    };

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

        if (newPosition.y > window.innerHeight) {
            setCurrentPosition(prev => ({
                ...prev,
                y: window.innerHeight,
            }));
        }
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
    };

    useEffect(() => {
        const handleClickOutside = () => {
            setContextMenuVisible(false);
        };

        document.addEventListener(CLICK_EVENT, handleClickOutside);

        return () => {
            document.removeEventListener(CLICK_EVENT, handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isSelecting) {
            document.addEventListener(
                MOUSE_MOVE_EVENT,
                handleMouseMove as EventListener,
            );
            document.addEventListener(MOUSE_UP_EVENT, handleMouseUp);
        }

        return () => {
            document.removeEventListener(
                MOUSE_MOVE_EVENT,
                handleMouseMove as EventListener,
            );
            document.removeEventListener(MOUSE_UP_EVENT, handleMouseUp);
        };
    }, [isSelecting]);

    useEffect(() => {
        if (isSelecting) {
            const newSelectedFiles = desktopFiles
                .filter(({ position }) =>
                    isFileInSelection(position, DESKTOP_FILE_SIZE, {
                        startPosition,
                        currentPosition,
                    }),
                )
                .map(({ name }) => name);

            dispatch(selectMultipleFiles(newSelectedFiles));
        }
    }, [currentPosition, isSelecting, desktopFiles, dispatch]);

    const getSelectionStyles = () => {
        const width = Math.abs(currentPosition.x - startPosition.x);
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
        <div
            className={styles.Desktop}
            onMouseDown={handleMouseDown}
            onContextMenu={handleContextMenu}
        >
            {contextMenuVisible && (
                <DesktopContextMenu
                    isFileMenu={isFile}
                    contextMenuPosition={contextMenuPosition}
                    files={desktopFiles}
                    setContextMenuVisible={setContextMenuVisible}
                />
            )}
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
                    onContextMenu={handleContextMenu}
                />
            ))}
            {isSettingsModalOpen && <SettingsModal />}
        </div>
    );
};

export default Desktop;
