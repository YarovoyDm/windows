import React, { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from 'react-tooltip';
import { ContextMenuItem, useContextMenu } from "use-context-menu";
import { map } from 'lodash';
import cn from 'classnames';
import { LANGUAGES } from 'Constants/TaskPanel';
import { useClickOutside } from "../../Hooks/useClickOutside";
import Icon from '../Icon/Icon';
import { ReactComponent as Search } from 'Icons/searchIcon.svg';
import { ReactComponent as Windows } from 'Icons/windowsIcon.svg';
import { ReactComponent as Arrow } from 'Icons/upArrowIcon.svg';
import {
    openingApp,
    changeApp,
    handleInputValue,
    handleInputModal,
    handleHiddenAppsModal,
    handleClickOutside,
} from 'Reducers/TaskPanelReducer';
import { AppDispatch } from "Reducers";

import './TaskPanel.css';
import "use-context-menu/styles.css";

const TaskPanel = () => {
    const dispatch: AppDispatch = useDispatch();
    const ref = useRef(null);

    const taskPanelApps = useSelector(({ taskPanel: { taskPanelApps } }) => taskPanelApps);
    const languageIndex = useSelector(({ taskPanel: { systemLanguageIndex } }) => systemLanguageIndex);
    const searchInputValue = useSelector(({ taskPanel: { searchInput: { searchInputValue } } }) => searchInputValue);
    const isSearchInputModalOpen = useSelector(({ taskPanel: { searchInput: { searchInputModalOpen } } }) => searchInputModalOpen);
    const isHiddenAppsModalOpen = useSelector(({ taskPanel: { hiddenAppsModalOpen } }) => hiddenAppsModalOpen);

    const onAppClick = (name: string) => {
        dispatch(openingApp(name));
        dispatch(changeApp(name));
    };

    useClickOutside(ref, () => {
        dispatch(handleClickOutside());
    });

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

    const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(handleInputValue(e.target.value));
    };

    const onHiddenAppsChange = () => {
        console.log('hehe');
        dispatch(handleHiddenAppsModal());
    };

    // const ss = () => {
    //     dispatch(handleInputModal());
    // };

    return(
        <div className='taskPanel' onContextMenu={onContextMenu} onKeyDown={onKeyDown} tabIndex={0}>
            {contextMenu}
            <div className='taskPanelWindows'>
                <Windows className='taskPanelWindowsIcon'/>
            </div>
            <div className='taskPanelSearch'>
                <Search className='searchIcon'/>
                <input
                    className='taskPanelSearchInput'
                    placeholder='Пошук'
                    value={searchInputValue}
                    onChange={onSearchInputChange}
                    // onFocus={ss}
                />
                {isSearchInputModalOpen
                    && <div className='searchInputModal taskPanelModal'>1</div>}
            </div>
            <div className='taskPanelAppWrapper'>{pinedAppsRender}</div>
            <Tooltip
                id='my-tooltip'
                className='taskPanelAppTooltip'
                classNameArrow='tooltipArrow'
            />
            <div className='taskPanelSidebar'>
                <div
                    ref={ref}
                    className={cn('taskPanelSidebarUnit', isHiddenAppsModalOpen && 'isHiddenAppOpen')}
                    onClick={() => onHiddenAppsChange()}
                >
                    <Arrow className={cn('collapseArrow', isHiddenAppsModalOpen && 'collapseArrowRotate')}/>
                    {isHiddenAppsModalOpen && <div className='hiddenAppsModal taskPanelModal'>1</div>}
                </div>
                <div className='taskPanelSidebarUnit'>{LANGUAGES[languageIndex]}</div>
                <div className='taskPanelSidebarUnit'></div>
                <div className='taskPanelSidebarUnit'></div>
            </div>
        </div>
    );
};

export default TaskPanel;
