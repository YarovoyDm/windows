import React, { useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from 'react-tooltip';
import { ContextMenuItem, useContextMenu } from "use-context-menu";
import { map } from 'lodash';
import cn from 'classnames';
import { LANGUAGES } from 'Constants/TaskPanel';
import Icon from '../Icon/Icon';
import { openingApp, changeApp } from 'Reducers/TaskPanelReducer';
import { AppDispatch } from "Reducers";

import './TaskPanel.css';
import "use-context-menu/styles.css";

const TaskPanel = () => {
    const dispatch: AppDispatch = useDispatch();
    const taskPanelApps = useSelector(({ taskPanel: { taskPanelApps } }) => taskPanelApps);
    const languageIndex = useSelector(({ taskPanel: { systemLanguageIndex } }) => systemLanguageIndex);

    const onAppClick = (name: string) => {
        dispatch(openingApp(name));
        dispatch(changeApp(name));
    };

    const { contextMenu, onContextMenu, onKeyDown } = useContextMenu(
        <>
            <ContextMenuItem >One</ContextMenuItem>
            <ContextMenuItem>Two</ContextMenuItem>
            <ContextMenuItem >Three</ContextMenuItem>
        </>,
    );

    const pinedAppsRender = useMemo(() => {
        return taskPanelApps
            && map(taskPanelApps, ({ name, isOpen, isFocused } : {name: string, isOpen: boolean, isFocused: boolean}) => {
                return <div
                    key={name}
                    className={cn('taskPanelAppUnit', isFocused && 'appIsActive')}
                    data-tooltip-content={name}
                    data-tooltip-id='my-tooltip'
                    onClick={() => onAppClick(name)}
                >
                    <div className='taskPanelAppIcon'><Icon name={name}/></div>
                    {isOpen && <div className={cn('isAppOpen', isFocused && 'appInFocus')}></div>}
                </div>;
            });
    }, [taskPanelApps]);

    return(
        <div className='taskPanel' onContextMenu={onContextMenu} onKeyDown={onKeyDown} tabIndex={0}>
            {contextMenu}
            <div className='taskPanelAppWrapper'>{pinedAppsRender}</div>
            <Tooltip id='my-tooltip' className='taskPanelAppTooltip' classNameArrow='tooltipArrow'/>
            <div className='taskPanelSidebar'>
                <>{LANGUAGES[languageIndex]}</>
            </div>
        </div>
    );
};

export default TaskPanel;
