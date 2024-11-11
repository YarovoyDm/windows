export type FileSize = {
    name: string;
    iconName: string;
    size: { width: number; height: number };
    hotKeys: string;
    isSelected: boolean;
};

export type SystemType = {
    inputLanguageIndex: number;
    systemPassword: string;
    systemLanguage: string;
    isWindowsUnlock: boolean;
    desktopFileSize: { width: number; height: number };
    wallpaper: string;
    systemScenario: string;
};
