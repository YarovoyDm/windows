import { useState } from "react";

import { DEFAULT_DESKTOP_CONTEXT_MENU_WIDTH } from "Constants/Desktop";
import { RIGHT_MOUSE_BUTTON_CODE, ZERO_POSITION } from "Constants/System";

type Position = {
    x: number;
    y: number;
};

export const useContextMenu = () => {
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] =
        useState<Position>(ZERO_POSITION);
    const [isFile, setIsFile] = useState(false);

    const handleContextMenu = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        if (e.button === RIGHT_MOUSE_BUTTON_CODE) {
            e.preventDefault();

            const target = e.target as HTMLElement;
            const isFileClicked = target.closest('[data-file="true"]') !== null;

            setIsFile(isFileClicked);

            const menuWidth = DEFAULT_DESKTOP_CONTEXT_MENU_WIDTH;

            let x = e.clientX;
            const y = e.clientY;

            if (x + menuWidth > window.innerWidth) {
                x = e.clientX - menuWidth;
            }

            setContextMenuPosition({ x, y });
            setContextMenuVisible(true);
        }
    };

    return {
        contextMenuVisible,
        contextMenuPosition,
        isFile,
        handleContextMenu,
        setContextMenuVisible,
    };
};
