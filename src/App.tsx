import React, { useEffect } from 'react';
import './App.css';
import Desktop from 'Components/Desktop/Desktop';
import TaskPanel from 'Components/TaskPanel/TaskPanel';
import { useDispatch } from "react-redux";
import { changeLanguageIndex } from "Reducers/TaskPanelReducer";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleContextMenu = (e: any) => {
            // prevent the right-click menu from appearing
            e.preventDefault();
        };

        // attach the event listener to
        // the document object
        document.addEventListener("contextmenu", handleContextMenu);

        // add keydown listener
        document.addEventListener('keydown', detectKeyDown, true);

        // clean up the event listener when
        // the component unmounts
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };

    }, []);

    const detectKeyDown = (e: any) => {
        if (e.shiftKey && e.altKey) {
            dispatch(changeLanguageIndex());
        }
    };

    return (
        <div className='window'>
            <Desktop />
            <TaskPanel />
        </div>
    );
}

export default App;
