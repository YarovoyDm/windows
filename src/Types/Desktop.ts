export type File = {
    name: string;
    icon: string;
    position: {
        x: number;
        y: number;
    };
    isSelected: boolean;
};

export type Desktop = {
    desktopFiles: File[];
    bin: Array<File>;
    isSettingsModalOpen: boolean;
    selectedFiles: Array<string>;
};
