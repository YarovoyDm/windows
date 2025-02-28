export type IFile = {
    name: string;
    icon: string;
    position: {
        x: number;
        y: number;
    };
    isSelected: boolean;
    type: string;
    innerContent: Array<IFile> | string;
    isOpened: boolean;
    id: string;
};

export type Desktop = {
    desktopFiles: IFile[];
    bin: Array<IFile>;
    selectedFiles: Array<string>;
    openedWindows: Array<{
        fileName: string;
        content: Array<IFile> | string;
        id: string;
        zIndex: number;
        type: string;
        isSystem?: boolean;
    }>;
};
