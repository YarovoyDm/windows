import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Tooltip } from "react-tooltip";
import LockScreen from "Components/LockScreen/LockScreen";
import { CONTEXT_MENU_EVENT, KEY_DOWN_EVENT } from "Constants/System";
import { Desktop, TaskPanel } from "Containers";

import styles from "./App.module.scss";
import { changeLanguageIndexByHotKeys } from "Store/slices/System";
import { useAppSelector } from "./Store";

function App() {
    const dispatch = useDispatch();
    const isWindowsLock = useAppSelector(state => state.system.isWindowsUnlock);

    const detectKeyDown = (e: KeyboardEvent) => {
        if (e.shiftKey && e.altKey) {
            dispatch(changeLanguageIndexByHotKeys());
        }
    };

    useEffect(() => {
        const handleContextMenu = (e: Event) => {
            e.preventDefault();
        };

        document.addEventListener(CONTEXT_MENU_EVENT, handleContextMenu);
        document.addEventListener(
            KEY_DOWN_EVENT,
            detectKeyDown as EventListener,
        );
        return () => {
            document.removeEventListener(CONTEXT_MENU_EVENT, handleContextMenu);
        };
    }, []);

    return (
        <div className={styles.window}>
            <Tooltip
                id='taskPanelTooltips'
                className={styles.taskPanelAppTooltip}
                classNameArrow={styles.tooltipArrow}
            />
            {!isWindowsLock ? <LockScreen /> : [<Desktop />, <TaskPanel />]}
        </div>
    );
}

export default App;
