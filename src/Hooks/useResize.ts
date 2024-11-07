import {
    DIRECTION_BOTTOM,
    DIRECTION_RIGHT,
    MIN_WINDOW_HEIGHT,
    MIN_WINDOW_WIDTH,
    MOUSE_MOVE_EVENT,
    MOUSE_UP_EVENT,
    TASK_PANEL_HEIGHT,
    ZERO_POSITION,
} from "Constants/System";
import { useEffect, useState } from "react";

const useResize = (
    initialSize: { width: number; height: number },
    setPosition: ({ x, y }: { x: number; y: number }) => void,
    position: { x: number; y: number },
) => {
    const [size, setSize] = useState({
        width: initialSize.width,
        height: initialSize.height,
    });
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState("");
    const [startPos, setStartPos] = useState(ZERO_POSITION);
    const [startSize, setStartSize] = useState(size);
    const [prevSize, setPrevSize] = useState(size);
    const [prevPosition, setPrevPosition] = useState(position);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleResizeMouseUp = () => {
        setIsResizing(false);
        setResizeDirection("");
    };

    const toggleFullscreen = () => {
        if (isFullscreen) {
            setSize(prevSize);
            setPosition(prevPosition);
        } else {
            setPrevSize(size);
            setPrevPosition(position);
            setPosition(ZERO_POSITION);
            setSize({
                width: window.innerWidth,
                height: window.innerHeight - TASK_PANEL_HEIGHT,
            });
        }
        setIsFullscreen(!isFullscreen);
    };

    const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
        e.preventDefault();
        setIsResizing(true);
        setResizeDirection(direction);
        setStartPos({ x: e.clientX, y: e.clientY });
        setStartSize(size);
    };

    const handleDoubleClick = () => {
        toggleFullscreen();
    };

    const handleResizeMouseMove = (e: MouseEvent) => {
        if (!isResizing) return;

        const deltaX = e.clientX - startPos.x;
        const deltaY = e.clientY - startPos.y;

        setSize(prevSize => {
            let newWidth = startSize.width;
            let newHeight = startSize.height;

            if (resizeDirection.includes(DIRECTION_RIGHT)) {
                const windowWidth = window.innerWidth;

                newWidth = Math.max(
                    MIN_WINDOW_WIDTH,
                    Math.min(windowWidth, startSize.width + deltaX),
                );
            }
            if (resizeDirection.includes(DIRECTION_BOTTOM)) {
                const windowHeight = window.innerHeight;

                newHeight = Math.max(
                    MIN_WINDOW_HEIGHT,
                    Math.min(
                        windowHeight - TASK_PANEL_HEIGHT,
                        startSize.height + deltaY,
                    ),
                );

                if (newHeight + position.y > windowHeight - TASK_PANEL_HEIGHT) {
                    newHeight = windowHeight - TASK_PANEL_HEIGHT - position.y;
                }
            }

            return { width: newWidth, height: newHeight };
        });
    };

    useEffect(() => {
        if (isResizing) {
            document.addEventListener(
                MOUSE_MOVE_EVENT,
                handleResizeMouseMove as EventListener,
            );
            document.addEventListener(
                MOUSE_UP_EVENT,
                handleResizeMouseUp as EventListener,
            );
        }

        return () => {
            document.removeEventListener(
                MOUSE_MOVE_EVENT,
                handleResizeMouseMove as EventListener,
            );
            document.removeEventListener(
                MOUSE_UP_EVENT,
                handleResizeMouseUp as EventListener,
            );
        };
    }, [isResizing]);

    return {
        handleResizeMouseDown,
        handleDoubleClick,
        size,
        toggleFullscreen,
        isFullscreen,
    };
};

export default useResize;
