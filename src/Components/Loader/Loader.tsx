import React from "react";

import styles from "./Loader.module.scss";

const Loader = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loadingCircle}></div>
            <div className={styles.loadingCircle}></div>
            <div className={styles.loadingCircle}></div>
            <div className={styles.loadingCircle}></div>
            <div className={styles.loadingCircle}></div>
        </div>
    );
};

export default Loader;
