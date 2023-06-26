import React from 'react';
import Icon from "Components/Icon/Icon";
import {
    HIDDEN_APPS,
} from 'Constants/TaskPanel';

import './HiddenAppsModal.css';

const HiddenAppsModal: React.FC = () => {
    const renderHiddenApps = () => {
        return HIDDEN_APPS.map(appName => {
            return <div key={appName} className='hiddenAppUnit'><Icon name={appName} className='appUnitIcon'/></div>;
        });
    };

    return (
        <div
            onClick={e => e.stopPropagation()}
            className='hiddenAppsModal taskPanelModal'
        >
            {renderHiddenApps()}
        </div>
    );
};

export default HiddenAppsModal;