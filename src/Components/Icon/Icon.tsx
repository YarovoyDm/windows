import { ReactComponent as Telegram } from "Icons/telegramIcon.svg";
import { ReactComponent as Skype } from "Icons/skypeIcon.svg";
import { ReactComponent as Chrome } from "Icons/chromeIcon.svg";
import { ReactComponent as Steam } from "Icons/steamIcon.svg";
import { ReactComponent as User } from "Icons/userIcon.svg";
import { ReactComponent as Power } from "Icons/powerIcon.svg";
import { ReactComponent as Sleep } from "Icons/sleepModIcon.svg";
import { ReactComponent as Reload } from "Icons/reloadModIcon.svg";
import { ReactComponent as Postman } from "Icons/postmanIcon.svg";
import { ReactComponent as WebStorm } from "Icons/webstormIcon.svg";
import { ReactComponent as Search } from "Icons/searchIcon.svg";
import { ReactComponent as Windows } from "Icons/windowsIcon.svg";
import { ReactComponent as Arrow } from "Icons/upArrowIcon.svg";
import { ReactComponent as TextFile } from "Icons/TextFileIcon.svg";
import { ReactComponent as Folder } from "Icons/folderIcon.svg";
import { ReactComponent as Bin } from "Icons/binIcon.svg";
import { ReactComponent as Settings } from "Icons/settingsIcon.svg";
import { ReactComponent as Calculator } from "Icons/calculatorIcon.svg";
import { ReactComponent as Cross } from "Icons/crossIcon.svg";
import { ReactComponent as PlusCircle } from "Icons/plusCircleIcon.svg";
import { ReactComponent as ViewBoxes } from "Icons/viewBoxesIcon.svg";
import { ReactComponent as RightArrow } from "Icons/rightArrow.svg";
import { ReactComponent as SquareList } from "Icons/squareListIcon.svg";
import { ReactComponent as Dot } from "Icons/dotIcon.svg";
import { ReactComponent as SquareInSquare } from "Icons/squareOnSquare.svg";
import { ReactComponent as SquareOutline } from "Icons/squareOutline.svg";
import { ReactComponent as Line } from "Icons/line.svg";
import { ReactComponent as FullArrow } from "Icons/fullArrow.svg";
import {
    TELEGRAM,
    SKYPE,
    GOOGLE_CHROME,
    STEAM,
    POSTMAN,
    WEBSTORM,
} from "Constants/TaskPanel";
import { FOLDER, BIN } from "Constants/Desktop";
import {
    ARROW,
    CALCULATOR,
    CROSS,
    DOT,
    LINE,
    PLUS_CIRCLE,
    POWER,
    RELOAD,
    RIGHT_ARROW,
    SEARCH,
    SETTINGS,
    SLEEP,
    SQUARE_IN_SQUARE,
    SQUARE_LIST,
    SQUARE_OUTLINE,
    TEXT_FILE,
    USER,
    VIEW_BOXES,
    WINDOWS,
    FULL_ARROW,
} from "Constants/System";

type IProps = {
    name: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
};

const Icons = {
    [TELEGRAM]: Telegram,
    [SKYPE]: Skype,
    [GOOGLE_CHROME]: Chrome,
    [STEAM]: Steam,
    [POSTMAN]: Postman,
    [WEBSTORM]: WebStorm,
    [USER]: User,
    [POWER]: Power,
    [SLEEP]: Sleep,
    [RELOAD]: Reload,
    [SEARCH]: Search,
    [WINDOWS]: Windows,
    [ARROW]: Arrow,
    [TEXT_FILE]: TextFile,
    [FOLDER]: Folder,
    [BIN]: Bin,
    [SETTINGS]: Settings,
    [CALCULATOR]: Calculator,
    [CROSS]: Cross,
    [PLUS_CIRCLE]: PlusCircle,
    [VIEW_BOXES]: ViewBoxes,
    [RIGHT_ARROW]: RightArrow,
    [SQUARE_LIST]: SquareList,
    [DOT]: Dot,
    [SQUARE_IN_SQUARE]: SquareInSquare,
    [SQUARE_OUTLINE]: SquareOutline,
    [LINE]: Line,
    [FULL_ARROW]: FullArrow,
};

const Icon = (props: IProps) => {
    const { name } = props;
    const Component = Icons[name as keyof typeof Icons];

    return <Component {...props} />;
};

export default Icon;
