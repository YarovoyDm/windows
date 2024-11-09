import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import styles from "./LockScreen.module.scss";
import DateTimeDisplay from "Components/DateTimeDisplay/DateTimeDisplay";
import Icon from "Components/Icon/Icon";
import {
    ENTER_KEY_CODE,
    FULL_ARROW,
    KEY_DOWN_EVENT,
    SYSTEM_PASSWORD,
    USER,
} from "Constants/System";
import { useAppDispatch } from "Store/index";
import { toggleWindowsUnlock } from "Store/slices/System";

const LockScreen = () => {
    const dispatch = useAppDispatch();
    const [isLoginScreenShow, setIsLoginScreenShow] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const isTouchedRef = useRef(false);

    const isPasswordValid = useMemo(
        () => SYSTEM_PASSWORD.toLowerCase() === password.toLowerCase(),
        [password],
    );

    const onPasswordChange = (e: React.SyntheticEvent<Element, Event>) => {
        const target = e.target as HTMLInputElement;

        setPassword(target.value.trim());
    };

    const login = () => {
        if (isPasswordValid) {
            dispatch(toggleWindowsUnlock(true));
            return;
        }
        setError(true);
    };

    const onLoginScreenChange = (e: KeyboardEvent) => {
        setIsLoginScreenShow(true);
        if (e.key === ENTER_KEY_CODE && isPasswordValid) {
            dispatch(toggleWindowsUnlock(true));
        }
        if (
            e.key === ENTER_KEY_CODE &&
            !isPasswordValid &&
            isTouchedRef.current
        ) {
            setError(true);
        }
    };

    useEffect(() => {
        document.addEventListener(
            KEY_DOWN_EVENT,
            onLoginScreenChange as EventListener,
        );

        return () => {
            document.removeEventListener(
                KEY_DOWN_EVENT,
                onLoginScreenChange as EventListener,
            );
        };
    }, [password]);

    const handleFocus = () => {
        isTouchedRef.current = true;
    };

    return (
        <div
            className={`${styles.lockScreen} ${
                isLoginScreenShow ? styles.blur : styles.noBlur
            }`}
            style={{
                alignItems: isLoginScreenShow ? "flex-start" : "flex-end",
                justifyContent: isLoginScreenShow ? "center" : "none",
            }}
            onClick={() => setIsLoginScreenShow(true)}
        >
            {!isLoginScreenShow && (
                <DateTimeDisplay
                    containerClassName={styles.containerPrimary}
                    timeClassName={styles.timePrimary}
                    dateClassName={styles.datePrimary}
                />
            )}
            {isLoginScreenShow && (
                <div className={styles.loginForm}>
                    <div className={styles.userAvatar}>
                        <Icon name={USER} />
                    </div>
                    <div className={styles.userName}>Yarovyi</div>
                    <div className={styles.inputWrapper}>
                        <input
                            onFocus={handleFocus}
                            placeholder='Password is: 1111'
                            value={password}
                            onChange={e => onPasswordChange(e)}
                            className={error ? styles.error : ""}
                            autoFocus={isLoginScreenShow}
                        />
                        <div
                            className={styles.iconWrapper}
                            onClick={() => login()}
                        >
                            <Icon name={FULL_ARROW} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LockScreen;
