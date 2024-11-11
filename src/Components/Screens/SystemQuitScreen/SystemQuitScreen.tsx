import React from "react";

import styles from "./SystemQuitScreen.module.scss";
import Loader from "Components/Loader/Loader";
import useLanguage from "Hooks/useLanguage";
import translations from "Components/I18n/translations";

type IProps = {
    type: keyof typeof translations.en;
};

const SystemQuitScreen = ({ type }: IProps) => {
    const { translate } = useLanguage();

    return (
        <div className={styles.wrapper}>
            <Loader />
            <div className={styles.status}>{translate(type)}</div>
        </div>
    );
};

export default SystemQuitScreen;
