export type IFile = {
    name: string;
    icon: string;
    position: {
        x: number;
        y: number;
    };
    isSelected: boolean;
    type: string;
    innerContent: Array<IFile>;
};

export type Desktop = {
    desktopFiles: IFile[];
    bin: Array<IFile>;
    isSettingsModalOpen: boolean;
    selectedFiles: Array<string>;
};
