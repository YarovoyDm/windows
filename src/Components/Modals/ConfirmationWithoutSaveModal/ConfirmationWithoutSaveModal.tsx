import React from "react";

import styles from "./ConfirmationWithoutSaveModal.module.scss";

type IProps = {
    handleSave: () => void;
    unsaveExit: () => void;
    onConfirmationModalChange: () => void;
};

const ConfirmationWithoutSaveModal = ({
    handleSave,
    unsaveExit,
    onConfirmationModalChange,
}: IProps) => {
    return (
        <div className={styles.confirmation}>
            <div className={styles.confirmationWindow}>
                <div className={styles.confirmationTitle}>
                    Хочете зберегти зміни?
                </div>
                <div className={styles.confirmationSubTitle}>
                    У вас є незбережені зміни.
                </div>
                <div className={styles.confirmationButtons}>
                    <button onClick={() => handleSave()}>Зберегти</button>
                    <button onClick={() => unsaveExit()}>Не зберігати</button>
                    <button onClick={onConfirmationModalChange}>
                        Скасувати
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationWithoutSaveModal;
