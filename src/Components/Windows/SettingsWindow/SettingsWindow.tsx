import React from "react";

import cn from "classnames";
import { WALLPAPERS } from "Constants/System";

import styles from "./SettingsWindow.module.scss";
import { useAppDispatch, useAppSelector } from "Store/index";
import { selectWallpaper } from "Store/selectors/System";
import { changeWallpaper } from "Store/slices/System";
import WindowBasic from "Components/Windows/WindowBasic/WindowBasic";

const SettingsWindow = () => {
    const dispatch = useAppDispatch();
    const currentWallpaper = useAppSelector(selectWallpaper);

    const onWallpaperChange = (newWallpaper: string) => {
        dispatch(changeWallpaper(newWallpaper));
    };

    return (
        <WindowBasic name='dsd' id='sds'>
            {WALLPAPERS.map(wallpaper => {
                return (
                    <div
                        className={cn(styles.wallpaper, {
                            [styles.selected]: currentWallpaper === wallpaper,
                        })}
                        style={{ backgroundImage: `url(${wallpaper})` }}
                        onClick={() => onWallpaperChange(wallpaper)}
                    />
                );
            })}
        </WindowBasic>
    );
};

export default SettingsWindow;
