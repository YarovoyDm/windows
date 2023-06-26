import React, { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from 'react-tooltip';
import { map } from 'lodash';
import cn from 'classnames';
import HiddenAppsModal from "Components/Modals/HiddenAppsModal/HiddenAppsModal";
import WindowsModal from "Components/Modals/WindowsModal/WindowsModal";
import {
    LANGUAGES,
    WINDOWS_KEY,
    HIDDEN_APPS_KEY,
    LANGUAGES_KEY,
    SEARCH,
    WINDOWS,
    ARROW,
} from 'Constants/TaskPanel';
import { useClickOutside } from "Hooks/useClickOutside";
import Icon from 'Components/Icon/Icon';
import {
    openingApp,
    changeApp,
    handleInputValue,
    handleHiddenAppsModal,
    handleClickOutside,
    handleWindowsModal,
    handleLanguagesModal,
} from 'Reducers/TaskPanelReducer';
import { AppDispatch, RootState } from "Reducers";
import { ObjectOfModalRefs } from "Types/TaskPanelTypes";

import './TaskPanel.css';
import LanguagesModal from "Components/Modals/LanguagesModal/LanguagesModal";

const TaskPanel: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [currentModal, setCurrentModal] = useState<string>('');
    const refs: ObjectOfModalRefs = {
        windows: useRef(null),
        hiddenApps: useRef(null),
        languages: useRef(null),
    };

    const store = useSelector((state: RootState) => state);
    const {
        taskPanelApps,
        systemLanguageIndex,
        searchInput,
        hiddenAppsModalOpen,
        windowsModalOpen,
        isLanguagesModalOpen,
    } = store.taskPanel;

    useClickOutside(refs[currentModal as keyof typeof refs], () => {
        dispatch(handleClickOutside());
    });

    const onAppClick = (name: string) => {
        dispatch(openingApp(name));
        dispatch(changeApp(name));
    };

    const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(handleInputValue(e.target.value));
    };

    const onHiddenAppsChange = () => {
        setCurrentModal(HIDDEN_APPS_KEY);
        dispatch(handleHiddenAppsModal());
    };

    const onWindowsModalChange = () => {
        setCurrentModal(WINDOWS_KEY);
        dispatch(handleWindowsModal());
    };

    const onLanguagesModalChange = () => {
        setCurrentModal(LANGUAGES_KEY);
        dispatch(handleLanguagesModal());
    };

    const pinedAppsRender = useMemo(() => {
        return taskPanelApps
            && map(taskPanelApps, ({ name, isOpen, isFocused } : {name: string, isOpen: boolean, isFocused: boolean}) => {
                return <div
                    key={name}
                    className={cn('taskPanelAppUnit', isFocused && 'appIsActive')}
                    data-tooltip-content={name}
                    data-tooltip-id='taskPanelTooltips'
                    onClick={() => onAppClick(name)}
                >
                    <Icon className='taskPanelAppIcon' name={name}/>
                    {isOpen && <div className={cn('isAppOpen', isFocused && 'appInFocus')}></div>}
                </div>;
            });
    }, [taskPanelApps]);

    return(
        <div className='taskPanel'>
            <div
                ref={refs.windows}
                className={cn('taskPanelWindows', windowsModalOpen && 'windowsModalOpen')}
                onClick={onWindowsModalChange}
            >
                <Icon name={WINDOWS} className='taskPanelWindowsIcon'/>
                {windowsModalOpen && <WindowsModal />}
            </div>
            <div className='taskPanelSearch'>
                <Icon name={SEARCH} className='searchIcon'/>
                <input
                    className='taskPanelSearchInput'
                    placeholder='Пошук'
                    value={searchInput.searchInputValue}
                    onChange={onSearchInputChange}
                    // onFocus={ss}
                />
                {searchInput.searchInputModalOpen
                    && <div className='searchInputModal taskPanelModal'>1</div>}
            </div>
            <div className='taskPanelAppWrapper'>{pinedAppsRender}</div>
            <Tooltip
                id='taskPanelTooltips'
                className='taskPanelAppTooltip'
                classNameArrow='tooltipArrow'
            />
            <div className='taskPanelSidebar'>
                <div
                    ref={refs.hiddenApps}
                    className={cn('taskPanelSidebarUnit', hiddenAppsModalOpen && 'hiddenAppOpen')}
                    onClick={onHiddenAppsChange}
                >
                    {hiddenAppsModalOpen && <HiddenAppsModal />}
                    <Icon name={ARROW} className={cn('collapseArrow', hiddenAppsModalOpen && 'collapseArrowRotate')}/>

                </div>
                <div
                    ref={refs.languages}
                    className={cn('taskPanelSidebarUnit', isLanguagesModalOpen && 'languagesModalOpen')}
                    onClick={onLanguagesModalChange}
                >
                    {isLanguagesModalOpen && <LanguagesModal />}
                    {LANGUAGES[systemLanguageIndex].abbreviation}
                </div>
                <div className='taskPanelSidebarUnit'></div>
                <div className='taskPanelSidebarUnit'></div>
            </div>
        </div>
    );
};

export default TaskPanel;
