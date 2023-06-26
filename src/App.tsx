import React, { useEffect } from 'react';
import './App.css';
import Desktop from 'Components/Desktop/Desktop';
import TaskPanel from 'Components/TaskPanel/TaskPanel';
import LockScreen from "Components/LockScreen/LockScreen";
import { useDispatch } from "react-redux";
import { changeLanguageIndexByHotKeys } from "Reducers/TaskPanelReducer";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleContextMenu = (e: Event) => {
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

    const detectKeyDown = (e: KeyboardEvent) => {
        if (e.shiftKey && e.altKey) {
            dispatch(changeLanguageIndexByHotKeys());
        }
    };

    return (
        <div className='window'>
            {false && <LockScreen />}
            <Desktop />
            <TaskPanel />
        </div>
    );
}

export default App;
