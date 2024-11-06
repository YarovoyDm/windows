import { useState, useEffect } from "react";
import {
    MOUSE_MOVE_EVENT,
    MOUSE_UP_EVENT,
    RIGHT_MOUSE_BUTTON_CODE,
    TASK_PANEL_HEIGHT,
    ZERO_POSITION,
} from "Constants/System";

const useDrag = (
    initialPosition: { x: number; y: number },
    objectSize: { width: number; height: number },
) => {
    const [position, setPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState(ZERO_POSITION);

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || e.buttons === RIGHT_MOUSE_BUTTON_CODE) return;
        e.preventDefault();

        let newX = e.clientX - offset.x;
        let newY = e.clientY - offset.y;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const objectWidth = objectSize.width * 0.2;
        const objectHeight = objectSize.height * 0.2;

        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;
        if (newX + objectWidth > windowWidth) newX = windowWidth - objectWidth;
        if (newY + (objectHeight + TASK_PANEL_HEIGHT) > windowHeight)
            newY = windowHeight - (objectHeight + TASK_PANEL_HEIGHT);

        setPosition({ x: newX, y: newY });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
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
    }, [isDragging]);

    return {
        position,
        handleMouseDown,
        setPosition,
    };
};

export default useDrag;
