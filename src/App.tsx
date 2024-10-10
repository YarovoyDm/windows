import React, { useEffect } from "react";
import styles from "./App.module.scss";
import Desktop from "Components/Desktop/Desktop";
import TaskPanel from "Containers/TaskPanel/TaskPanel";
import LockScreen from "Components/LockScreen/LockScreen";
import { useDispatch } from "react-redux";
import { changeLanguageIndexByHotKeys } from "Store/slices/TaskPanelSlice";
import { Tooltip } from "react-tooltip";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleContextMenu = (e: Event) => {
            e.preventDefault();
        };

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("keydown", detectKeyDown, true);
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);

    const detectKeyDown = (e: KeyboardEvent) => {
        if (e.shiftKey && e.altKey) {
            dispatch(changeLanguageIndexByHotKeys());
        }
    };

    return (
        <div className={styles.window}>
            <Tooltip
                id='taskPanelTooltips'
                className={styles.taskPanelAppTooltip}
                classNameArrow={styles.tooltipArrow}
            />
            {false && <LockScreen />}
            <Desktop />
            <TaskPanel />
        </div>
    );
}

export default App;
