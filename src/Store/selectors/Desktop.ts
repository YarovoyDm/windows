import { createSelector } from "@reduxjs/toolkit";
import { Desktop } from "Types/Desktop";
import { RootState } from "..";

const selectDesktop = (state: RootState) => state.desktop;

export const selectFiles = createSelector(
    selectDesktop,
    (state: Desktop) => state.desktopFiles,
);

export const selectIsWindowOpen = (winodwName: string) =>
    createSelector(
        selectDesktop,
        (state: Desktop) =>
            state.openedWindows.filter(window => window.fileName === winodwName)
                .length,
    );

export const selectOpenedWindows = createSelector(
    selectDesktop,
    (state: Desktop) => state.openedWindows,
);

export const selectWindowZindex = (id: string) =>
    createSelector(
        selectDesktop,
        (state: Desktop) =>
            state.openedWindows.filter(item => item.id === id)[0].zIndex,
    );

export const selectFolder = (id: string) =>
    createSelector(
        selectDesktop,
        (state: Desktop) =>
            state.desktopFiles.filter(file => file.id === id)[0],
    );
