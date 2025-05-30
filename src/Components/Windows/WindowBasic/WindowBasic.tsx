import React, { useEffect, useMemo, useState } from "react";
import {
    CROSS,
    DIRECTIONS_RESIZE_MAP,
    LINE,
    SQUARE_IN_SQUARE,
    SQUARE_OUTLINE,
    TASK_PANEL_HEIGHT,
} from "Constants/System";
import cn from "classnames";
import useDrag from "Hooks/useDrag";
import { DEFAULT_DESKTOP_MODAL_SIZE } from "Constants/Desktop";
import Icon from "Components/Icon/Icon";
import { getRandomCenterCoordinates } from "helpers/getRandomCenterCoordinates";
import useResize from "Hooks/useResize";
import { useAppDispatch, useAppSelector } from "Store/index";
import { changeWindowZindex, closeWindow } from "Store/slices/Desktop";
import { selectWindowZindex } from "Store/selectors/Desktop";

import styles from "./WindowBasic.module.scss";

type IProps = {
    name: string;
    id: string;
    onCloseCallback?: false | (() => void);
    system?: boolean;
    wishSidePadding?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const WindowBasic = ({
    children,
    name,
    id,
    onCloseCallback,
    system,
    wishSidePadding,
    ...rest
}: IProps) => {
    const [newSize, setNewSize] = useState<{
        width: number;
        height: number;
    } | null>(null);

    const { position, handleMouseDown, setPosition } = useDrag(
        getRandomCenterCoordinates(),
        newSize || DEFAULT_DESKTOP_MODAL_SIZE,
    );
    const dispatch = useAppDispatch();
    const zIndex = useAppSelector(selectWindowZindex(id));

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
        dispatch(closeWindow(id));
    };

    const onWindowZindexChange = () => {
        dispatch(changeWindowZindex(id));
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
                padding: wishSidePadding ? "0 10px" : 0,
            }}
            {...rest}
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
            {DIRECTIONS_RESIZE_MAP.map(direction => {
                return (
                    <div
                        key={direction.name}
                        className={styles[direction.class]}
                        onMouseDown={e =>
                            handleResizeMouseDown(e, direction.name)
                        }
                    />
                );
            })}
        </div>
    );
};

export default WindowBasic;
