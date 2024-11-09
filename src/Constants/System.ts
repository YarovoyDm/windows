import { LanguagesType } from "Types/TaskPanelTypes";

import wallpaper from "../assets/wallpaper.jpeg";
import bri from "../assets/bri.jpg";
import bessHamiti from "../assets/bessHamiti.jpg";
import iriser from "../assets/iriser.jpg";
import witcher from "../assets/witcher.jpg";
import witcher2 from "../assets/witcher2.jpg";

export const USER: string = "User";
export const POWER: string = "Power";
export const SLEEP: string = "Sleep";
export const RELOAD: string = "Reload";
export const SEARCH: string = "Search";
export const WINDOWS: string = "Windows";
export const ARROW: string = "Arrow";
export const TEXT_FILE: string = "Text_file";
export const SETTINGS: string = "Settings";
export const CALCULATOR: string = "Calculator";
export const CROSS: string = "Cross";
export const VIEW_BOXES: string = "ViewBoxes";
export const PLUS_CIRCLE: string = "PlusCircle";
export const RIGHT_ARROW: string = "RightArrow";
export const SQUARE_LIST: string = "SquareList";
export const DOT: string = "Dot";
export const SQUARE_IN_SQUARE: string = "SquareInSquare";
export const SQUARE_OUTLINE: string = "SquareOutline";
export const LINE: string = "Line";
export const FULL_ARROW: string = "FullArrow";

export const POWER_MODAL_UNITS = {
    [POWER]: "Завершити роботу",
    [SLEEP]: "Сон",
    [RELOAD]: "Перезавантажити",
};

export const WALLPAPERS = [
    wallpaper,
    bri,
    bessHamiti,
    iriser,
    witcher,
    witcher2,
];

export const SYSTEM_PASSWORD: string = "1111";

export const ZERO_POSITION = {
    x: 0,
    y: 0,
};

export const TASK_PANEL_HEIGHT: number = 51;

// Languages
export const ENG: string = "ENG";
export const UA: string = "УКР";
export const POL: string = "POL";
export const LANGUAGES: Array<LanguagesType> = [
    {
        abbreviation: UA,
        title: "Українська",
        subTitle: "Українська (розширена)",
    },
    { abbreviation: ENG, title: "Англійська (США)", subTitle: "US" },
    { abbreviation: POL, title: "Польська", subTitle: "Польська" },
];
export const DEFAULT_LANGUAGE_INDEX: number = 0;
export const LANGUAGE_CHANGE_STEP: number = 1;
export const MAX_LANGUAGES: number = LANGUAGES.length - LANGUAGE_CHANGE_STEP;

// Key codes

export const DELETE_KEY_CODE: string = "Delete";
export const ENTER_KEY_CODE: string = "Enter";
export const S_KEY_CODE: string = "s";

// Events

export const KEY_DOWN_EVENT: keyof DocumentEventMap = "keydown";
export const MOUSE_DOWN_EVENT: keyof DocumentEventMap = "mousedown";
export const MOUSE_MOVE_EVENT: keyof DocumentEventMap = "mousemove";
export const MOUSE_UP_EVENT: keyof DocumentEventMap = "mouseup";
export const CLICK_EVENT: keyof DocumentEventMap = "click";
export const CONTEXT_MENU_EVENT: keyof DocumentEventMap = "contextmenu";

export const RIGHT_MOUSE_BUTTON_CODE: number = 2;

export const SYSTEM: string = "system";

export const DIRECTION_RIGHT: string = "right";
export const DIRECTION_BOTTOM: string = "bottom";
export const DIRECTION_RIGHT_BOTTOM: string = "right bottom";

export const DIRECTIONS_RESIZE_MAP = [
    { name: DIRECTION_RIGHT, class: "resizeHandleRight" },
    { name: DIRECTION_BOTTOM, class: "resizeHandleBottom" },
    { name: DIRECTION_RIGHT_BOTTOM, class: "resizeHandleCorner" },
];

export const DESKTOP_FILE_SIZE_SMALL: string = "small";
export const DESKTOP_FILE_SIZE_MEDIUM: string = "medium";
export const DESKTOP_FILE_SIZE_LARGE: string = "large";

export const DESKTOP_FILE_SIZE = {
    [DESKTOP_FILE_SIZE_SMALL]: { width: 60, height: 50 },
    [DESKTOP_FILE_SIZE_MEDIUM]: { width: 80, height: 70 },
    [DESKTOP_FILE_SIZE_LARGE]: { width: 100, height: 90 },
};

export const MIN_WINDOW_WIDTH = 430;
export const MIN_WINDOW_HEIGHT = 260;

export const SIZE_HOT_KEYS_MAP = {
    Digit2: DESKTOP_FILE_SIZE[DESKTOP_FILE_SIZE_LARGE],
    Digit3: DESKTOP_FILE_SIZE[DESKTOP_FILE_SIZE_MEDIUM],
    Digit4: DESKTOP_FILE_SIZE[DESKTOP_FILE_SIZE_SMALL],
};

export const DESKTOP_FILE_SIZE_UNIT = [
    {
        name: "Великі пікторами",
        iconName: SQUARE_LIST,
        size: DESKTOP_FILE_SIZE[DESKTOP_FILE_SIZE_LARGE],
        hotKeys: "Crtl+Shift+2",
    },
    {
        name: "Середні піктограми",
        iconName: SQUARE_LIST,
        size: DESKTOP_FILE_SIZE[DESKTOP_FILE_SIZE_MEDIUM],
        hotKeys: "Crtl+Shift+3",
    },
    {
        name: "Дрібні піктограми",
        iconName: VIEW_BOXES,
        size: DESKTOP_FILE_SIZE[DESKTOP_FILE_SIZE_SMALL],
        hotKeys: "Crtl+Shift+4",
    },
];

export const SHOW_SAVE_MESSAGE_DELAY: number = 2000;
