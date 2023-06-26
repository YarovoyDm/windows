import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import cn from 'classnames';
import Icon from 'Components/Icon/Icon';
import { USER, POWER, SLEEP, RELOAD } from "Constants/TaskPanel";
import { handlePowerModal } from "Reducers/TaskPanelReducer";
import { AppDispatch, RootState } from "Reducers/index";

import './WindowsModal.css';

const WindowsModal: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const store = useSelector((state: RootState) => state);
    const { isPowerModalOpen } = store.taskPanel;

    const onWindowsModalChange = () => {
        dispatch(handlePowerModal());
    };

    return (
        <div
            onClick={e => e.stopPropagation()}
            className='taskPanelWindowsModal taskPanelModal'
        >
            <div className='windowsModalMain'>1</div>
            <div className='windowsModalFooter'>
                <div className='footerUser'>
                    <div className='userIconWrapper'><Icon name={USER} className='userIcon'/></div>
                    <div className='userName'>Beast</div>
                </div>
                <div onClick={onWindowsModalChange} className={cn('footerPower', isPowerModalOpen && 'powerModalOpen')}>
                    {isPowerModalOpen &&
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className='powerModal taskPanelModal'
                        >
                            <div className='powerModalUnit'>
                                <Icon name={SLEEP} className='modalUnitIcon'/>
                                <div className='modalUnitText'>Сон</div>
                            </div>
                            <div className='powerModalUnit'>
                                <Icon name={RELOAD} className='modalUnitIcon'/>
                                <div className='modalUnitText'>Перезавантажити</div>
                            </div>
                            <div className='powerModalUnit'>
                                <Icon name={POWER} className='modalUnitIcon'/>
                                <div className='modalUnitText'>Завершити роботу</div>
                            </div>
                        </div>
                    }
                    <Icon name={POWER} className='powerIcon'/>
                </div>
            </div>
        </div>
    );
};

export default WindowsModal;