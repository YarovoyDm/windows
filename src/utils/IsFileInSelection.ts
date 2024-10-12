type Position = {
    x: number;
    y: number;
};

export const isFileInSelection = (
    filePosition: Position,
    fileSize: { width: number; height: number },
    meta: {
        startPosition: {
            x: number;
            y: number;
        };
        currentPosition: {
            x: number;
            y: number;
        };
    },
) => {
    const selectionX = Math.min(meta.startPosition.x, meta.currentPosition.x);
    const selectionY = Math.min(meta.startPosition.y, meta.currentPosition.y);
    const selectionWidth = Math.abs(
        meta.currentPosition.x - meta.startPosition.x,
    );
    const selectionHeight = Math.abs(
        meta.currentPosition.y - meta.startPosition.y,
    );

    const fileX = filePosition.x;
    const fileY = filePosition.y;
    const fileWidth = fileSize.width;
    const fileHeight = fileSize.height;

    return !(
        selectionX > fileX + fileWidth ||
        selectionX + selectionWidth < fileX ||
        selectionY > fileY + fileHeight ||
        selectionY + selectionHeight < fileY
    );
};
