import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import taskPanelSlice from "./slices/TaskPanelSlice";
import desktopSlice from "./slices/Desktop";
import systemSlice from "./slices/System";

const rootReducer = combineReducers({
    taskPanel: taskPanelSlice,
    desktop: desktopSlice,
    system: systemSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
