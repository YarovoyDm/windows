import { settingsModalHandler } from "Store/slices/Desktop";
import { SETTINGS } from "./System";

export const FILE_ACTIONS = {
    [SETTINGS]: settingsModalHandler(),
};

export const DESKTOP_FILE_SIZE = {
    width: 80,
    height: 70,
};
