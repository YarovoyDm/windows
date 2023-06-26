import React from 'react';
import { ReactComponent as Telegram } from 'Icons/telegramIcon.svg';
import { ReactComponent as Skype } from 'Icons/skypeIcon.svg';
import { ReactComponent as Chrome } from 'Icons/chromeIcon.svg';
import { ReactComponent as Steam } from 'Icons/steamIcon.svg';
import { ReactComponent as User } from 'Icons/userIcon.svg';
import { ReactComponent as Power } from 'Icons/powerIcon.svg';
import { ReactComponent as Sleep } from 'Icons/sleepModIcon.svg';
import { ReactComponent as Reload } from 'Icons/reloadModIcon.svg';
import { ReactComponent as Postman } from 'Icons/postmanIcon.svg';
import { ReactComponent as WebStorm } from 'Icons/webstormIcon.svg';
import { ReactComponent as Search } from 'Icons/searchIcon.svg';
import { ReactComponent as Windows } from 'Icons/windowsIcon.svg';
import { ReactComponent as Arrow } from 'Icons/upArrowIcon.svg';
import {
    TELEGRAM,
    SKYPE,
    GOOGLE_CHROME,
    STEAM,
    POSTMAN,
    WEBSTORM,
    USER,
    POWER,
    SLEEP,
    RELOAD,
    SEARCH,
    WINDOWS,
    ARROW,
} from 'Constants/TaskPanel';

type IProps = {
    name: string,
    className?: string,
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
};

const Icon = (props: IProps) => {
    const { name } = props;
    const Component = Icons[name as keyof typeof Icons];

    return <Component {...props}/> ;
};

export default Icon;