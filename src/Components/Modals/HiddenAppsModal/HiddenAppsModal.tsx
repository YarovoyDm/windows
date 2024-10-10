import React from "react";
import Icon from "Components/Icon/Icon";
import cn from "classnames";
import { HIDDEN_APPS } from "Constants/TaskPanel";

import styles from "./HiddenAppsModal.module.scss";

const HiddenAppsModal: React.FC = () => {
    return (
        <div
            onClick={e => e.stopPropagation()}
            className={cn(styles.hiddenAppsModal, styles.taskPanelModal)}
        >
            {HIDDEN_APPS.map(appName => {
                return (
                    <div key={appName} className={styles.hiddenAppUnit}>
                        <Icon name={appName} className={styles.appUnitIcon} />
                    </div>
                );
            })}
        </div>
    );
};

export default HiddenAppsModal;
