import React from "react";
import WindowBasic from "Components/Windows/WindowBasic/WindowBasic";

import styles from "./FolderWindow.module.scss";
import { useAppSelector } from "Store/index";
import { selectFolder } from "Store/selectors/Desktop";

const FolderWindow = ({ name, id }: { name: string; id: string }) => {
    const folder = useAppSelector(selectFolder(id));

    return (
        <WindowBasic name={name} id={id}>
            <div
                data-file='folder'
                data-id={id}
                data-name={name}
                className={styles.folder}
            >
                {Array.isArray(folder.innerContent) &&
                    folder.innerContent.map(item => {
                        return <div>{item.name}</div>;
                    })}
            </div>
        </WindowBasic>
    );
};

export default FolderWindow;
