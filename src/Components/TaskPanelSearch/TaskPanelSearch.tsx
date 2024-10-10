import React from "react";
import cn from "classnames";

import styles from "./TaskPanelSearch.module.scss";
import { SEARCH } from "Constants/TaskPanel";
import { useDispatch } from "react-redux";
import { AppDispatch } from "Store/index";
import { handleInputValue } from "Store/slices/TaskPanelSlice";
import Icon from "Components/Icon/Icon";

interface IInput {
    searchInput: { searchInputValue: string; searchInputModalOpen: boolean };
}

const TaskPanelSearch = ({ searchInput }: IInput) => {
    const dispatch: AppDispatch = useDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        dispatch(handleInputValue(value));
    };

    return (
        <div className={styles.taskPanelSearch}>
            <Icon name={SEARCH} className={styles.searchIcon} />
            <input
                className={styles.taskPanelSearchInput}
                placeholder='Пошук'
                value={searchInput.searchInputValue}
                onChange={handleInputChange}
            />
            {searchInput.searchInputModalOpen && (
                <div
                    className={cn(
                        styles.searchInputModal,
                        styles.taskPanelModal,
                    )}
                >
                    1
                </div>
            )}
        </div>
    );
};

export default TaskPanelSearch;
