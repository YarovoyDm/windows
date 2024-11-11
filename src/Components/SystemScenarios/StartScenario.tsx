import LockScreen from "Components/Screens/LockScreen/LockScreen";
import OffScreen from "Components/Screens/OffScreen/OffScreen";
import StartScreen from "Components/Screens/StartScreen/StartScreen";
import React, { useEffect, useState } from "react";

const StartScenario = () => {
    const [isSystemStart, setIsSystemStart] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const displayDuration = 4000;

    const onSystemChange = () => {
        setIsSystemStart(true);
        setCurrentIndex(1);
    };

    const screens = [
        <OffScreen isStartScreen start={onSystemChange} />,
        <StartScreen />,
        <LockScreen />,
    ];

    useEffect(() => {
        if (currentIndex === screens.length - 1 || !isSystemStart) {
            return;
        }

        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }, displayDuration);

        return () => clearInterval(interval);
    }, [currentIndex, screens.length, isSystemStart]);

    return <div>{screens[currentIndex]}</div>;
};

export default StartScenario;
