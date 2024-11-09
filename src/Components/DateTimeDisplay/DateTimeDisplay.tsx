import React, { useEffect, useState } from "react";

import styles from "./DateTimeDisplay.module.scss";

type IProps = {
    format?: "en" | "eu";
    containerClassName?: string;
    timeClassName?: string;
    dateClassName?: string;
};

const DateTimeDisplay = ({
    format = "en",
    containerClassName,
    timeClassName,
    dateClassName,
}: IProps) => {
    const [dateTime, setDateTime] = useState({
        time: "",
        date: "",
    });

    const updateDateTime = () => {
        const now = new Date();

        let time, date;

        if (format === "en") {
            time = now.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
            });
            date = now.toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
            });
            date = date.replace(/(\w+)(\s)/, "$1,$2");
        } else if (format === "eu") {
            time = now.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
            });
            date = now.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        }

        setDateTime({ time: time || "", date: date || "" });
    };

    useEffect(() => {
        updateDateTime();
        const timerId = setInterval(updateDateTime, 1000);

        return () => clearInterval(timerId);
    }, [format]);

    return (
        <div
            className={containerClassName}
            style={{ fontSize: "2em", textAlign: "center" }}
        >
            <div className={timeClassName}>{dateTime.time}</div>
            <div className={dateClassName}>{dateTime.date}</div>
        </div>
    );
};

export default DateTimeDisplay;
