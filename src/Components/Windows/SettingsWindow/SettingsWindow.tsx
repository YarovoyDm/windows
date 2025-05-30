import { useState } from "react";

import cn from "classnames";
import { TEXT_FILE, WALLPAPERS } from "Constants/System";

import styles from "./SettingsWindow.module.scss";
import { useAppDispatch, useAppSelector } from "Store/index";
import {
    selectFileSelectionColor,
    selectFileSize,
    selectNightMode,
    selectSelectionStyles,
    selectWallpaper,
} from "Store/selectors/System";
import {
    changeBrightness,
    changeDesktopFileSize,
    changeFileSelectionColor,
    changeNightMode,
    changeSelectionStyle,
    changeWallpaper,
} from "Store/slices/System";
import WindowBasic from "Components/Windows/WindowBasic/WindowBasic";
import { BlockBasic } from "./Components/BlockBasic/BlockBasic";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import useSystem from "Hooks/useSystem";
import Switch from "react-switch";
import Icon from "Components/Icon/Icon";

const SettingsWindow = () => {
    const [brightness, setBrightness] = useState<number | number[]>(1);
    const dispatch = useAppDispatch();
    const systemInfo = useSystem();
    const isNightMode = useAppSelector(selectNightMode);
    const selectionStyles = useAppSelector(selectSelectionStyles);
    const fileSelectionColor = useAppSelector(selectFileSelectionColor);
    const selectedSize = useAppSelector(selectFileSize);

    const currentWallpaper = useAppSelector(selectWallpaper);

    const onWallpaperChange = (newWallpaper: string) => {
        dispatch(changeWallpaper(newWallpaper));
    };

    const onBrightnessChange = (e: number | number[]) => {
        setBrightness(e);
        const brightnessValue = Array.isArray(e) ? e[0] : e;

        dispatch(changeBrightness(brightnessValue));
    };

    const onNightModeChange = () => {
        dispatch(changeNightMode());
    };

    const borderColors = [
        "#4a90e2",
        "#72c799",
        "#e79cff",
        "#9ce7ff",
        "#FF5733",
        "#caff00",
    ];
    const areaColors = [
        "rgba(74, 144, 226, 0.2)",
        "rgba(34, 193, 195, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(0, 29, 255, 0.2)",
        "rgba(233, 30, 99, 0.2)",
        "rgba(255, 193, 7, 0.2)",
    ];

    const fileSelectionColors = [
        "rgba(179, 180, 179, 1)",
        "rgba(34, 193, 195, 1)",
        "rgba(99, 71, 125, 1)",
        "rgba(175, 158, 69, 1)",
        "rgba(127, 195, 161, 1)",
        "rgba(181, 122, 15, 1)",
    ];

    const renderFileSelectionColors = () => {
        return fileSelectionColors.map(color => {
            return (
                <div
                    className={cn(styles.color, {
                        [styles.colorSelected]: fileSelectionColor === color,
                    })}
                    onClick={() => dispatch(changeFileSelectionColor(color))}
                    style={{
                        background: color,
                    }}
                />
            );
        });
    };

    const renderBorderColors = () => {
        return borderColors.map(color => {
            return (
                <div
                    className={cn(styles.color, {
                        [styles.colorSelected]:
                            selectionStyles.borderColor === color,
                    })}
                    onClick={() =>
                        dispatch(
                            changeSelectionStyle({
                                key: "borderColor",
                                value: color,
                            }),
                        )
                    }
                    style={{
                        background: color,
                    }}
                />
            );
        });
    };

    const renderAreaColors = () => {
        return areaColors.map(color => {
            return (
                <div
                    className={cn(styles.color, {
                        [styles.colorSelected]:
                            selectionStyles.areaColor === color,
                    })}
                    onClick={() =>
                        dispatch(
                            changeSelectionStyle({
                                key: "areaColor",
                                value: color,
                            }),
                        )
                    }
                    style={{
                        background: color,
                    }}
                />
            );
        });
    };

    return (
        <WindowBasic name='Settings' id='sdsdsdss' wishSidePadding>
            <BlockBasic header='Wallpapers'>
                {WALLPAPERS.map(wallpaper => {
                    return (
                        <div
                            className={cn(styles.wallpaper, {
                                [styles.selected]:
                                    currentWallpaper === wallpaper,
                            })}
                            style={{ backgroundImage: `url(${wallpaper})` }}
                            onClick={() => onWallpaperChange(wallpaper)}
                        />
                    );
                })}
            </BlockBasic>
            <BlockBasic header='Display'>
                <div className={styles.displayWrapper}>
                    <div className={styles.itemWrapper}>
                        <div className={styles.itemTitle}>Brighness</div>
                        <div className={styles.sliderWrapper}>
                            <Slider
                                step={0.1}
                                min={0.1}
                                value={brightness}
                                max={1}
                                onChange={e => onBrightnessChange(e)}
                                className={styles.slider}
                            />
                        </div>
                    </div>
                    <div className={styles.itemWrapper}>
                        <div className={styles.itemTitle}>Night mode</div>
                        <Switch
                            checked={isNightMode}
                            onChange={onNightModeChange}
                            onColor='#86d3ff'
                            onHandleColor='#2693e6'
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
                            activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
                            height={20}
                            width={48}
                            className='react-switch'
                            id='material-switch'
                        />
                    </div>
                </div>
            </BlockBasic>
            <BlockBasic header='Desktop'>
                <div className={styles.displayWrapper}>
                    <div className={styles.itemWrapper}>
                        <div className={styles.itemTitle}>Selection color</div>
                        <div className={styles.colorsWrapper}>
                            <div className={styles.colorPicker}>
                                <div className={styles.colorItem}>
                                    <div className={styles.colorTitle}>
                                        Border color
                                    </div>
                                    <div className={styles.colors}>
                                        {renderBorderColors()}
                                    </div>
                                </div>
                                <div className={styles.colorItem}>
                                    <div className={styles.colorTitle}>
                                        Area color
                                    </div>
                                    <div className={styles.colors}>
                                        {renderAreaColors()}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={styles.colorResult}
                                style={{
                                    border: `solid 3px ${selectionStyles.borderColor}`,
                                    background: selectionStyles.areaColor,
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.itemWrapper}>
                        <div className={styles.itemTitle}>File color</div>
                        <div className={styles.colorsWrapper}>
                            <div
                                className={cn(
                                    styles.colorPicker,
                                    styles.fileColorWrapper,
                                )}
                            >
                                <div className={styles.colorItem}>
                                    <div className={styles.colorTitle}>
                                        File selection color
                                    </div>
                                    <div className={styles.colors}>
                                        {renderFileSelectionColors()}
                                    </div>
                                </div>
                                <div
                                    className={styles.fileResult}
                                    style={{
                                        background: fileSelectionColor,
                                        marginLeft: "50px",
                                    }}
                                >
                                    <Icon name={TEXT_FILE} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.itemWrapper}>
                        <div className={styles.itemTitle}>File size</div>
                        <div className={styles.fileSizeWrapper}>
                            <div
                                className={styles.fileSize}
                                onClick={() =>
                                    dispatch(
                                        changeDesktopFileSize({
                                            width: 60,
                                            height: 50,
                                        }),
                                    )
                                }
                            >
                                <div
                                    className={cn(styles.fileResult, {
                                        [styles.selectedFileSize]:
                                            selectedSize.height === 50,
                                    })}
                                    style={{
                                        background: fileSelectionColor,
                                    }}
                                >
                                    <Icon
                                        name={TEXT_FILE}
                                        style={{
                                            height: "20px",
                                            width: "20px",
                                        }}
                                    />
                                </div>
                                <div className={styles.sizeTitle}>Small</div>
                            </div>
                            <div
                                className={styles.fileSize}
                                onClick={() =>
                                    dispatch(
                                        changeDesktopFileSize({
                                            width: 80,
                                            height: 70,
                                        }),
                                    )
                                }
                            >
                                <div
                                    className={cn(styles.fileResult, {
                                        [styles.selectedFileSize]:
                                            selectedSize.height === 70,
                                    })}
                                    style={{
                                        background: fileSelectionColor,
                                    }}
                                >
                                    <Icon
                                        name={TEXT_FILE}
                                        style={{
                                            height: "30px",
                                            width: "30px",
                                        }}
                                    />
                                </div>
                                <div className={styles.sizeTitle}>Medium</div>
                            </div>
                            <div
                                className={styles.fileSize}
                                onClick={() =>
                                    dispatch(
                                        changeDesktopFileSize({
                                            width: 100,
                                            height: 90,
                                        }),
                                    )
                                }
                            >
                                <div
                                    className={cn(styles.fileResult, {
                                        [styles.selectedFileSize]:
                                            selectedSize.height === 90,
                                    })}
                                    style={{
                                        background: fileSelectionColor,
                                    }}
                                >
                                    <Icon
                                        name={TEXT_FILE}
                                        style={{
                                            height: "40px",
                                            width: "40px",
                                        }}
                                    />
                                </div>
                                <div className={styles.sizeTitle}>Large</div>
                            </div>
                        </div>
                    </div>
                </div>
            </BlockBasic>
            <BlockBasic header='System information'>
                <div className={styles.systemInfoWrapper}>
                    <div className={styles.systemInfoItem}>
                        <div className={styles.systemItemTitle}>Platform:</div>
                        <div className={styles.systemItemValue}>
                            {systemInfo?.platform} {systemInfo?.cpuArchitecture}
                        </div>
                    </div>
                    <div className={styles.systemInfoItem}>
                        <div className={styles.systemItemTitle}>
                            Color depth:
                        </div>
                        <div className={styles.systemItemValue}>
                            {systemInfo?.colorDepth} bit
                        </div>
                    </div>
                    <div className={styles.systemInfoItem}>
                        <div className={styles.systemItemTitle}>
                            Concurrency:
                        </div>
                        <div className={styles.systemItemValue}>
                            {systemInfo?.hardwareConcurrency}
                        </div>
                    </div>
                </div>
            </BlockBasic>
        </WindowBasic>
    );
};

export default SettingsWindow;
