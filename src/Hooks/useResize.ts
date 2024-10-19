import { useEffect, useState } from "react";

const MIN_WIDTH = 430; // Мінімальна ширина вікна
const MIN_HEIGHT = 260; // Мінімальна висота вікна

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
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
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
            setPosition({ x: 0, y: 0 });
            setSize({
                width: window.innerWidth,
                height: window.innerHeight - 51,
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

            if (resizeDirection.includes("right")) {
                const windowWidth = window.innerWidth;

                newWidth = Math.max(
                    MIN_WIDTH,
                    Math.min(windowWidth, startSize.width + deltaX),
                );
            }
            if (resizeDirection.includes("bottom")) {
                const windowHeight = window.innerHeight;

                newHeight = Math.max(
                    MIN_HEIGHT,
                    Math.min(windowHeight - 51, startSize.height + deltaY),
                );

                if (newHeight + position.y > windowHeight - 51) {
                    newHeight = windowHeight - 51 - position.y;
                }
            }

            return { width: newWidth, height: newHeight };
        });
    };

    useEffect(() => {
        if (isResizing) {
            document.addEventListener("mousemove", handleResizeMouseMove);
            document.addEventListener("mouseup", handleResizeMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleResizeMouseMove);
            document.removeEventListener("mouseup", handleResizeMouseUp);
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
