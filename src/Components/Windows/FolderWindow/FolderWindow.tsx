import React from "react";
import WindowBasic from "Components/WindowBasic/WindowBasic";

const FolderWindow = ({ name, id }: { name: string; id: string }) => {
    return (
        <WindowBasic name={name} id={id}>
            <div
                data-file='folder'
                data-id={id}
                data-name={name}
                style={{
                    padding: "20px",
                    border: "1px solid #ccc",
                    height: "100%",
                    boxSizing: "border-box",
                }}
            >
                Папка {name}
            </div>
        </WindowBasic>
    );
};

export default FolderWindow;
