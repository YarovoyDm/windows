import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Tooltip } from "react-tooltip";
import { CONTEXT_MENU_EVENT, KEY_DOWN_EVENT } from "Constants/System";
import { Desktop, TaskPanel } from "Containers";

import styles from "./App.module.scss";
import { changeLanguageIndexByHotKeys } from "Store/slices/System";
import { useAppSelector } from "./Store";
import useLanguage from "Hooks/useLanguage";
import { updateFile } from "Store/slices/Desktop";
import RestartScenario from "Components/SystemScenarios/RestartScenario";
import StartScenario from "Components/SystemScenarios/StartScenario";
import ShutDownScenario from "Components/SystemScenarios/ShutDownScenario";
import {
    selectNightMode,
    selectSystemBrightness,
    selectSystemScenario,
} from "Store/selectors/System";
import ErrorBoundary from "Components/ErrorBoundary/ErrorBoundary";

const SCENARIOS_MAP = {
    restart: <RestartScenario />,
    start: <StartScenario />,
    shutdown: <ShutDownScenario />,
};

function App() {
    const dispatch = useDispatch();
    const { translate } = useLanguage();
    const systemScenario = useAppSelector(selectSystemScenario);
    const windowsRef = useRef<HTMLDivElement | null>(null);
    const brightness = useAppSelector(selectSystemBrightness);
    const isNightMode = useAppSelector(selectNightMode);

    useEffect(() => {
        if (windowsRef.current) {
            if (isNightMode) {
                // Нічний режим: знижуємо яскравість та контраст
                windowsRef.current.style.filter =
                    "sepia(0.3) brightness(0.6) contrast(1.2)";
            } else {
                // Денні налаштування (якщо потрібно)
                windowsRef.current.style.filter = `brightness(${brightness})`;
            }
        }
    }, [brightness, isNightMode]);

    const detectKeyDown = (e: KeyboardEvent) => {
        if (e.shiftKey && e.altKey) {
            dispatch(changeLanguageIndexByHotKeys());
        }
    };

    useEffect(() => {
        const handleContextMenu = (e: Event) => {
            e.preventDefault();
        };

        dispatch(updateFile({ id: ":2d", newValue: translate("readMeFile") }));
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
        <ErrorBoundary>
            <div className={styles.window} ref={windowsRef}>
                <Tooltip
                    id='taskPanelTooltips'
                    className={styles.taskPanelAppTooltip}
                    classNameArrow={styles.tooltipArrow}
                />
                {systemScenario
                    ? SCENARIOS_MAP[
                          systemScenario as keyof typeof SCENARIOS_MAP
                      ]
                    : [<Desktop />, <TaskPanel />]}
            </div>
        </ErrorBoundary>
    );
}

export default App;
