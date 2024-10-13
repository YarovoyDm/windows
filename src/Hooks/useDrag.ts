import { useState, useEffect } from "react";

const useDrag = (
    initialPosition: { x: number; y: number },
    objectSize: { width: number; height: number },
) => {
    const [position, setPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();

        let newX = e.clientX - offset.x;
        let newY = e.clientY - offset.y;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const objectWidth = objectSize.width;
        const objectHeight = objectSize.height;

        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;
        if (newX + objectWidth > windowWidth) newX = windowWidth - objectWidth;
        if (newY + (objectHeight + 51) > windowHeight)
            newY = windowHeight - (objectHeight + 51);

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
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    return {
        position,
        handleMouseDown,
    };
};

export default useDrag;