import React from "react";
import { Icon } from "Components";
import { SEARCH } from "Constants/System";
import { useAppDispatch } from "Store/index";

import styles from "./TaskPanelSearch.module.scss";

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
