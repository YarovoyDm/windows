import React from "react";
import cn from "classnames";

import styles from "./TaskPanelSearch.module.scss";
import { SEARCH } from "Constants/TaskPanel";
import { useAppDispatch } from "Store/index";

import Icon from "Components/Icon/Icon";

const TaskPanelSearch = () => {
    const dispatch = useAppDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
    };

    return (
        <div className={styles.taskPanelSearch}>
            <Icon name={SEARCH} className={styles.searchIcon} />
            <input
                className={styles.taskPanelSearchInput}
                placeholder='Пошук'
                value={5}
                onChange={handleInputChange}
            />
            {/* {searchInput.searchInputModalOpen && (
                <div
                    className={cn(
                        styles.searchInputModal,
                        styles.taskPanelModal,
                    )}
                >
                    1
                </div>
            )} */}
        </div>
    );
};

export default TaskPanelSearch;
