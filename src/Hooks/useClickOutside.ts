import React, { useEffect } from "react";

export const useClickOutside = (
    ref: React.RefObject<HTMLElement>,
    callback: () => void,
) => {
    const handleClick = (e: Event) => {
        if (!ref) {
            return;
        }
        if (ref.current && !ref.current.contains(e.target as Node)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [ref]);
};