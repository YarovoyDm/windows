import React from "react";

import styles from "./StartScreen.module.scss";
import Icon from "Components/Icon/Icon";
import { WINDOWS } from "Constants/System";
import Loader from "Components/Loader/Loader";

const StartScreen = () => {
    return (
        <div className={styles.wrapper}>
            <Icon name={WINDOWS} />
            <Loader />
        </div>
    );
};

export default StartScreen;
