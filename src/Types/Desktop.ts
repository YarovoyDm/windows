export type File = {
    name: string;
    icon: string;
    position: {
        x: number;
        y: number;
    };
};

export type Desktop = {
    desktopFiles: Array<File>;
    bin: Array<File>;
    isSettingsModalOpen: boolean;
};
