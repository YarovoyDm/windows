import React, { useEffect } from "react";

export const useClickOutside = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
    const handleClick = (e: any) => {
        console.log('1');
        if (ref.current && !ref.current.contains(e.target)) {
            console.log('3');
            callback();
        }
    };

    const handleChildClick = (e: any) => {
        console.log('2');
        e.stopPropagation();
    };

    useEffect(() => {

        document.addEventListener("click", handleClick);
        // ref.current && ref.current.addEventListener("click", handleChildClick);

        return () => {

            document.removeEventListener("click", handleClick);
            // ref.current && ref.current.removeEventListener("click", handleChildClick);

        };
    }, [ref.current]);
};