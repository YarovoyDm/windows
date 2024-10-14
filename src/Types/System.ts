export type FileSize = {
    name: string;
    iconName: string;
    size: { width: number; height: number };
    hotKeys: string;
    isSelected: boolean;
};

export type SystemType = {
    systemLanguageIndex: number;
    systemPassword: number;
    isWindowsUnlock: boolean;
    desktopFileSize: { width: number; height: number };
};
