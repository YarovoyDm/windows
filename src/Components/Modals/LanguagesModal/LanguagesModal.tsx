import React from 'react';
import cn from 'classnames';
import { LANGUAGES } from 'Constants/TaskPanel';
import { changeLanguageIndex, handleLanguagesModal } from 'Reducers/TaskPanelReducer';

import './LanguagesModal.css';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "Reducers/index";

const LanguagesModal = () => {
    const store = useSelector((state: RootState) => state);
    const { systemLanguageIndex } = store.taskPanel;
    const dispatch: AppDispatch = useDispatch();

    const onLanguageChange = (index: number) => {
        dispatch(changeLanguageIndex(index));
        dispatch(handleLanguagesModal());
    };

    const languageUnitRender = () => {
        return LANGUAGES.map(({ subTitle, title, abbreviation }, index) => {
            return (
                <div
                    key={abbreviation}
                    onClick={() => onLanguageChange(index)}
                    className={cn('languageUnitWrapper', systemLanguageIndex === index && 'languageSelected')}
                >
                    {(systemLanguageIndex === index) && <div className='selectMarker'/>}
                    <div className='abbreviation'>{abbreviation}</div>
                    <div>
                        <div className='title'>{title}</div>
                        <div>{subTitle}</div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div
            onClick={e => e.stopPropagation()}
            className='languagesModal taskPanelModal'
        >
            <div className='languagesModalTitle'>
                <div className='titleText'>Розкладка клавіатури</div>
                <div className='titleHotKeys'>
                    <div className='hotKeysUnit'>Shift</div>
                    +
                    <div className='hotKeysUnit'>Alt</div>
                </div>
            </div>
            <div className='languagesModalMain'>{languageUnitRender()}</div>
        </div>
    );
};

export default LanguagesModal;