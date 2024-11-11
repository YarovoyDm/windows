import React from "react";
import cn from "classnames";
import * as _ from "lodash";
import { Icon } from "Components";
import { POWER_MODAL_UNITS } from "Constants/System";

import styles from "./PowerModal.module.scss";
import { useAppDispatch } from "Store/index";
import { updateSystemScenario } from "Store/slices/System";

const PowerModal = () => {
    const dispatch = useAppDispatch();

    return (
        <div
            onClick={e => e.stopPropagation()}
            className={cn(styles.powerModal, styles.taskPanelModal)}
        >
            {_.map(POWER_MODAL_UNITS, (unit, key) => {
                return (
                    <div
                        className={styles.powerModalUnit}
                        onClick={() =>
                            dispatch(updateSystemScenario(unit.scenario))
                        }
                    >
                        <Icon name={key} className={styles.modalUnitIcon} />
                        <div className={styles.modalUnitText}>{unit.name}</div>
                    </div>
                );
            })}
            {/* <div className={styles.powerModalUnit}>
                <Icon name={SLEEP} className={styles.modalUnitIcon} />
                <div className={styles.modalUnitText}>Сон</div>
            </div>
            <div className={styles.powerModalUnit}>
                <Icon name={RELOAD} className={styles.modalUnitIcon} />
                <div className={styles.modalUnitText}>Перезавантажити</div>
            </div>
            <div className={styles.powerModalUnit}>
                <Icon name={POWER} className={styles.modalUnitIcon} />
                <div className={styles.modalUnitText}>Завершити роботу</div>
            </div> */}
        </div>
    );
};

export default PowerModal;
