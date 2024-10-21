import React, { useEffect, useMemo, useState } from "react";
import styles from "./WindowBasic.module.scss";
import {
    CROSS,
    DIRECTION_BOTTOM,
    DIRECTION_RIGHT,
    DIRECTION_RIGHT_BOTTOM,
    LINE,
    SQUARE_IN_SQUARE,
    SQUARE_OUTLINE,
    TASK_PANEL_HEIGHT,
} from "Constants/System";
import cn from "classnames";
import useDrag from "Hooks/useDrag";
import { DEFAULT_DESKTOP_MODAL_SIZE } from "Constants/Desktop";
import Icon from "Components/Icon/Icon";
import useResize from "Hooks/useResize";
import { useAppDispatch, useAppSelector } from "Store/index";
import { changeWindowZindex, closeWindow } from "Store/slices/Desktop";
import { selectWindowZindex } from "Store/selectors/Desktop";
import { getRandomCenterCoordinates } from "helpers/getRandomCenterCoordinates";

type IProps = {
    children: React.ReactNode;
    name: string;
    id: string;
    onCloseCallback?: false | (() => void);
};

const WindowBasic = ({ children, name, id, onCloseCallback }: IProps) => {
    const dispatch = useAppDispatch();
    const zIndex = useAppSelector(selectWindowZindex(id));
    const [newSize, setNewSize] = useState<{
        width: number;
        height: number;
    } | null>(null);

    const { position, handleMouseDown, setPosition } = useDrag(
        getRandomCenterCoordinates(),
        newSize || DEFAULT_DESKTOP_MODAL_SIZE,
    );

    const {
        handleDoubleClick,
        handleResizeMouseDown,
        size,
        toggleFullscreen,
        isFullscreen,
    } = useResize(DEFAULT_DESKTOP_MODAL_SIZE, setPosition, position);

    const borderRadius = useMemo(
        () =>
            size.height >= window.innerHeight - TASK_PANEL_HEIGHT
                ? "0px"
                : "10px",
        [size],
    );

    useEffect(() => {
        setNewSize(size);
    }, [size]);

    const onWindowClose = () => {
        dispatch(closeWindow({ id }));
    };

    const onWindowZindexChange = () => {
        dispatch(changeWindowZindex({ id }));
    };

    return (
        <div
            className={cn(styles.window, "prevent-selecting")}
            style={{
                left: position.x,
                top: position.y,
                width: size.width,
                height: size.height,
                borderRadius,
                zIndex: Number(zIndex),
            }}
            onMouseDown={onWindowZindexChange}
        >
            <div
                className={styles.header}
                onMouseDown={handleMouseDown}
                onDoubleClick={handleDoubleClick}
            >
                <div className={styles.title}>{name}</div>
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
                        onClick={() =>
                            onCloseCallback
                                ? onCloseCallback()
                                : onWindowClose()
                        }
                    >
                        <Icon name={CROSS} />
                    </div>
                </div>
            </div>

            {children}

            <div
                className={styles.resizeHandleRight}
                onMouseDown={e => handleResizeMouseDown(e, DIRECTION_RIGHT)}
            />
            <div
                className={styles.resizeHandleBottom}
                onMouseDown={e => handleResizeMouseDown(e, DIRECTION_BOTTOM)}
            />
            <div
                className={styles.resizeHandleCorner}
                onMouseDown={e =>
                    handleResizeMouseDown(e, DIRECTION_RIGHT_BOTTOM)
                }
            />
        </div>
    );
};

export default WindowBasic;
