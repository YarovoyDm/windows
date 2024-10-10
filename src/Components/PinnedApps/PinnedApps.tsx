import React from "react";
import { map } from "lodash";
import cn from "classnames";
import Icon from "Components/Icon/Icon";

import styles from "./PinnedApps.module.scss";
import { useAppDispatch } from "Store/index";
import { changeApp, openingApp } from "Store/slices/TaskPanelSlice";

type App = {
    name: string;
    isOpen?: boolean;
    isFocused?: boolean;
    component: React.ReactElement;
};

const PinnedApps = ({
    taskPanelApps,
}: {
    taskPanelApps: { [key: string]: App };
}) => {
    const dispatch = useAppDispatch();

    const onAppClick = (name: string) => {
        dispatch(openingApp(name));
        dispatch(changeApp(name));
    };

    return (
        <>
            {taskPanelApps &&
                map(
                    taskPanelApps,
                    ({
                        name,
                        isOpen,
                        isFocused,
                    }: {
                        name: string;
                        isOpen: boolean;
                        isFocused: boolean;
                    }) => {
                        return (
                            <div
                                key={name}
                                className={cn(styles.taskPanelAppUnit, {
                                    [styles.appIsActive]: isFocused,
                                })}
                                data-tooltip-content={name}
                                data-tooltip-id='taskPanelTooltips'
                                data-tooltip-delay-show={500}
                                onClick={() => onAppClick(name)}
                            >
                                <Icon
                                    className={styles.taskPanelAppIcon}
                                    name={name}
                                />
                                {isOpen && (
                                    <div
                                        className={cn(
                                            styles.isAppOpen,
                                            isFocused && styles.appInFocus,
                                        )}
                                    ></div>
                                )}
                            </div>
                        );
                    },
                )}
        </>
    );
};

export default PinnedApps;
