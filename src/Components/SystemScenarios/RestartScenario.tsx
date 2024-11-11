import LockScreen from "Components/Screens/LockScreen/LockScreen";
import OffScreen from "Components/Screens/OffScreen/OffScreen";
import SystemQuitScreen from "Components/Screens/SystemQuitScreen/SystemQuitScreen";
import StartScreen from "Components/Screens/StartScreen/StartScreen";
import React, { useEffect, useState } from "react";

const RestartScenario = () => {
    const screens = [
        <SystemQuitScreen type='restart' />,
        <OffScreen />,
        <StartScreen />,
        <LockScreen />,
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const displayDuration = 4000;

    useEffect(() => {
        if (currentIndex === screens.length - 1) {
            return;
        }

        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }, displayDuration);

        return () => clearInterval(interval);
    }, [currentIndex, screens.length]);

    return <div>{screens[currentIndex]}</div>;
};

export default RestartScenario;
