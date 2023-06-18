import React from 'react';
import * as _ from 'lodash';
import { useSelector } from "react-redux";

import './Icon.css';

const Icon = ({ name }: {name: string}) => {
    const taskPanelApps = useSelector(({ taskPanel: { taskPanelApps } }) => taskPanelApps);

    const getIcon = () => {
        return _.filter(taskPanelApps, item => item.name === name)[0]?.component || <div>2</div>;
    };

    return getIcon();
};

export default Icon;