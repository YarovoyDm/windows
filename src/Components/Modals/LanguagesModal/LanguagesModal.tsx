import React from "react";
import cn from "classnames";
import { LANGUAGES } from "Constants/TaskPanel";
import {
    changeLanguageIndex,
    handleLanguagesModal,
} from "Reducers/TaskPanelReducer";

import styles from "./LanguagesModal.module.scss";
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

    return (
        <div
            onClick={e => e.stopPropagation()}
            className={cn(styles.languagesModal, styles.taskPanelModal)}
        >
            <div className={styles.languagesModalTitle}>
                <div className={styles.titleText}>Розкладка клавіатури</div>
                <div className={styles.titleHotKeys}>
                    <div className={styles.hotKeysUnit}>Shift</div>+
                    <div className={styles.hotKeysUnit}>Alt</div>
                </div>
            </div>
            <div className={styles.languagesModalMain}>
                {LANGUAGES.map(({ subTitle, title, abbreviation }, index) => {
                    return (
                        <div
                            key={abbreviation}
                            onClick={() => onLanguageChange(index)}
                            className={cn(
                                styles.languageUnitWrapper,
                                systemLanguageIndex === index &&
                                    styles.languageSelected,
                            )}
                        >
                            {systemLanguageIndex === index && (
                                <div className={styles.selectMarker} />
                            )}
                            <div className={styles.abbreviation}>
                                {abbreviation}
                            </div>
                            <div>
                                <div className={styles.title}>{title}</div>
                                <div>{subTitle}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LanguagesModal;
