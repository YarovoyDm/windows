import { settingsModalHandler } from "Store/slices/Desktop";
import { SETTINGS } from "./TaskPanel";

export const FILE_ACTIONS = {
    [SETTINGS]: settingsModalHandler(),
};
