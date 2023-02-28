import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "./store";
import {initializeApp} from "./app.reducer";
import {CircularProgress} from '@mui/material';
import {AppRoutes} from "./AppRoutes";

export const App = () => {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    return isInitialized
        ? <AppRoutes/>
        : <div style={{position: 'fixed', top: '40%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>

}

