import {combineReducers} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {employeesReducer} from "../features/employees/redux/employees.reducer";
import {appReducer} from "./app.reducer";
import {educationsReducer} from "../features/educations/redux/educations.reducer";
import {positionsReducer} from "../features/positions/redux/positions.reducer";

export const rootReducer = combineReducers({
    employees: employeesReducer,
    app: appReducer,
    educations: educationsReducer,
    positions: positionsReducer,
})

export const store = configureStore({reducer: rootReducer})

export type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducerType>
export type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
// @ts-ignore
window.store = store

