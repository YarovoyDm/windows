import { LanguagesType } from "Types/TaskPanelTypes";

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

export const POWER_MODAL_UNITS = {
    [POWER]: "Завершити роботу",
    [SLEEP]: "Сон",
    [RELOAD]: "Перезавантажити",
};

export const SYSTEM_PASSWORD: number = 1111;

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

// Events

export const KEY_DOWN_EVENT: keyof DocumentEventMap = "keydown";
export const MOUSE_DOWN_EVENT: keyof DocumentEventMap = "mousedown";
export const MOUSE_MOVE_EVENT: keyof DocumentEventMap = "mousemove";
export const MOUSE_UP_EVENT: keyof DocumentEventMap = "mouseup";
export const CLICK_EVENT: keyof DocumentEventMap = "click";
export const CONTEXT_MENU_EVENT: keyof DocumentEventMap = "contextmenu";
