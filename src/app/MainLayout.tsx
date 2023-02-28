import React from 'react';
import {Outlet} from 'react-router-dom';
import {ErrorSnackbar} from "../shared/components/ErrorSnackBar";
import {RouteControls} from "./RouteControls";

export const MainLayout = () => {
    return (
        <>
            <RouteControls/>
            <Outlet/>
            <ErrorSnackbar/>
        </>
    );
};
