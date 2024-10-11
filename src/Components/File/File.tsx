import React from "react";

import styles from "./File.module.scss";
import Icon from "Components/Icon/Icon";

type IFile = {
    name: string;
    icon: string;
};

const File = ({ name, icon }: IFile) => {
    return (
        <div className={styles.file}>
            <Icon name={icon} />
            <div className={styles.fileName}>{name}</div>
        </div>
    );
};

export default File;
