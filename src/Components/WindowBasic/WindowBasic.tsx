import React, { useMemo } from "react";
import styles from "./WindowBasic.module.scss";
import {
    CROSS,
    LINE,
    SQUARE_IN_SQUARE,
    SQUARE_OUTLINE,
} from "Constants/System";
import cn from "classnames";
import useDrag from "Hooks/useDrag";
import {
    DEFAULT_DESKTOP_MODAL_POSITION,
    DEFAULT_DESKTOP_MODAL_SIZE,
} from "Constants/Desktop";
import Icon from "Components/Icon/Icon";
import useResize from "Hooks/useResize";

type IProps = {
    children: React.ReactNode;
};

const WindowBasic = ({ children }: IProps) => {
    const { position, handleMouseDown, setPosition } = useDrag(
        DEFAULT_DESKTOP_MODAL_POSITION,
        DEFAULT_DESKTOP_MODAL_SIZE,
    );

    const {
        handleDoubleClick,
        handleResizeMouseDown,
        size,
        toggleFullscreen,
        isFullscreen,
    } = useResize(DEFAULT_DESKTOP_MODAL_SIZE, setPosition, position);

    const borderRadius = useMemo(
        () => (size.height >= window.innerHeight - 51 ? "0px" : "10px"),
        [size],
    );

    return (
        <div
            className={cn(styles.window, "prevent-selecting")}
            style={{
                left: position.x,
                top: position.y,
                width: size.width,
                height: size.height,
                borderRadius,
            }}
        >
            <div
                className={styles.header}
                onMouseDown={handleMouseDown}
                onDoubleClick={handleDoubleClick}
            >
                <div className={styles.title}>Налаштування</div>
                <div className={styles.windowButtons}>
                    <div className={styles.iconWrapper}>
                        <Icon name={LINE} style={{ width: "15px" }} />
                    </div>
                    <div
                        className={styles.iconWrapper}
                        onClick={toggleFullscreen}
                    >
                        <Icon
                            name={
                                isFullscreen ? SQUARE_IN_SQUARE : SQUARE_OUTLINE
                            }
                            style={{ width: "12px", height: "12px" }}
                        />
                    </div>

                    <div
                        className={styles.iconWrapper}
                        style={{
                            borderTopRightRadius: borderRadius,
                        }}
                    >
                        <Icon name={CROSS} />
                    </div>
                </div>
            </div>

            {children}

            <div
                className={styles.resizeHandleRight}
                onMouseDown={e => handleResizeMouseDown(e, "right")}
            />
            <div
                className={styles.resizeHandleBottom}
                onMouseDown={e => handleResizeMouseDown(e, "bottom")}
            />
            <div
                className={styles.resizeHandleCorner}
                onMouseDown={e => handleResizeMouseDown(e, "right bottom")}
            />
        </div>
    );
};

export default WindowBasic;
