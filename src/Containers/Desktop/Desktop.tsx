import React, { useEffect, useRef, useState } from "react";
import { DraggableDesktopFile, DesktopContextMenu } from "Components";
import { SettingsModal } from "Components/Modals";
import { DESKTOP_FILE_SIZE } from "Constants/File";
import {
    CLICK_EVENT,
    MOUSE_MOVE_EVENT,
    MOUSE_UP_EVENT,
    TEXT_FILE,
    ZERO_POSITION,
} from "Constants/System";
import { useAppSelector, useAppDispatch } from "Store/index";
import {
    selectSettingsModalState,
    selectFiles,
    selectOpenedWindows,
} from "Store/selectors/Desktop";
import { selectMultipleFiles, clearSelection } from "Store/slices/Desktop";
import { isFileInSelection } from "utils/IsFileInSelection";

import styles from "./Desktop.module.scss";
import { useContextMenu } from "Hooks/useContextMenu";
import { selectWallpaper } from "Store/selectors/System";
import TextWindow from "Components/Windows/TextWindow/TextWindow";
import FolderWindow from "Components/Windows/FolderWindow/FolderWindow";

type Position = {
    x: number;
    y: number;
};

const Desktop = () => {
    const openedWindows = useAppSelector(selectOpenedWindows);
    const [isSelecting, setIsSelecting] = useState<boolean>(false);
    const [startPosition, setStartPosition] = useState<Position>(ZERO_POSITION);
    const [currentPosition, setCurrentPosition] =
        useState<Position>(ZERO_POSITION);

    const dispatch = useAppDispatch();
    const selectionRef = useRef<HTMLDivElement>(null);
    const {
        contextMenuVisible,
        contextMenuPosition,
        isFile,
        handleContextMenu,
        setContextMenuVisible,
    } = useContextMenu();

    const desktopFiles = useAppSelector(selectFiles);
    const wallpaper = useAppSelector(selectWallpaper);
    const isSettingsModalOpen = useAppSelector(selectSettingsModalState);
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

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    return (
        <div
            style={{
                backgroundImage: `url(${wallpaper})`,
            }}
            className={styles.Desktop}
            onMouseDown={handleMouseDown}
            onContextMenu={handleContextMenu}
            onDragOver={handleDragOver}
        >
            {contextMenuVisible && (
                <DesktopContextMenu
                    isFileMenu={isFile}
                    contextMenuPosition={contextMenuPosition}
                    setContextMenuVisible={setContextMenuVisible}
                />
            )}
            {openedWindows.map(window => {
                if (window.type === TEXT_FILE) {
                    return (
                        <TextWindow
                            key={window.id}
                            name={window.fileName}
                            content={window.content}
                            id={window.id}
                        />
                    );
                }
                return (
                    <FolderWindow
                        name={window.fileName}
                        id={window.id}
                        key={window.id}
                    />
                );
            })}

            {isSelecting && (
                <div
                    ref={selectionRef}
                    className={styles.selection}
                    style={getSelectionStyles()}
                />
            )}
            {desktopFiles.map(
                ({
                    name,
                    icon,
                    position,
                    isOpened,
                    innerContent,
                    id,
                    type,
                }) => (
                    <DraggableDesktopFile
                        key={name}
                        name={name}
                        icon={icon}
                        filePosition={position}
                        isOpened={isOpened}
                        content={innerContent}
                        setIsSelecting={setIsSelecting}
                        isSelected={selectedFiles.includes(name)}
                        onContextMenu={handleContextMenu}
                        id={id}
                        type={type}
                    />
                ),
            )}
            {isSettingsModalOpen && <SettingsModal />}
        </div>
    );
};

export default Desktop;
