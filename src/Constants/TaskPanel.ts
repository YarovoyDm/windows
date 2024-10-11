import type { LanguagesType } from "Types/TaskPanelTypes";

// Task panel apps
export const TASK_PANEL: string = "taskPanel";

export const TELEGRAM: string = "Telegram";
export const SKYPE: string = "Skype";
export const GOOGLE_CHROME: string = "Google Chrome";
export const STEAM: string = "Steam";
export const POSTMAN: string = "Postman";
export const WEBSTORM: string = "WebStorm";
export const HIDDEN_APPS: Array<string> = [
    POSTMAN,
    WEBSTORM,
    TELEGRAM,
    STEAM,
    GOOGLE_CHROME,
    SKYPE,
];

// System
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

export const POWER_MODAL_UNITS = {
    [POWER]: "Завершити роботу",
    [SLEEP]: "Сон",
    [RELOAD]: "Перезавантажити",
};

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

//keys
export const WINDOWS_KEY: string = "windows";
export const HIDDEN_APPS_KEY: string = "hiddenApps";
export const LANGUAGES_KEY: string = "languages";

//System
export const SYSTEM_PASSWORD: number = 1111;
