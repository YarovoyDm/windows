import React from "react";

import styles from "./ConfirmationWithoutSaveModal.module.scss";
import useLanguage from "Hooks/useLanguage";

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
    const { translate } = useLanguage();

    return (
        <div className={styles.confirmation}>
            <div className={styles.confirmationWindow}>
                <div className={styles.confirmationTitle}>
                    {translate("confirmationUnsaveTitle")}
                </div>
                <div className={styles.confirmationSubTitle}>
                    {translate("confirmationUnsaveSubTitle")}
                </div>
                <div className={styles.confirmationButtons}>
                    <button onClick={() => handleSave()}>
                        {translate("save")}
                    </button>
                    <button onClick={() => unsaveExit()}>
                        {translate("unsave")}
                    </button>
                    <button onClick={onConfirmationModalChange}>
                        {translate("cancel")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationWithoutSaveModal;
