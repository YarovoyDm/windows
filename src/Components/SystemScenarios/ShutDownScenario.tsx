import LockScreen from "Components/Screens/LockScreen/LockScreen";
import OffScreen from "Components/Screens/OffScreen/OffScreen";
import StartScreen from "Components/Screens/StartScreen/StartScreen";
import SystemQuitScreen from "Components/Screens/SystemQuitScreen/SystemQuitScreen";
import React, { useEffect, useState } from "react";

const ShutDownScenario = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const displayDuration = 4000;

    const onIndexChange = () => {
        setCurrentIndex(prev => prev + 1);
    };

    const screens = [
        <SystemQuitScreen type='shutdown' />,
        <OffScreen isShutDownScreen start={onIndexChange} />,
        <StartScreen />,
        <LockScreen />,
    ];

    useEffect(() => {
        if (currentIndex === 1) {
            return;
        }

        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }, displayDuration);

        return () => clearInterval(interval);
    }, [currentIndex, screens.length]);

    return <div>{screens[currentIndex]}</div>;
};

export default ShutDownScenario;
