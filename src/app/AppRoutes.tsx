import React from 'react'
import {PATH} from "./RouteVariables";
import {Route, Routes} from "react-router-dom";
import {MainLayout} from "./MainLayout";
import {EmployeesPage} from "../features/employees/EmployeesPage";
import {EducationsPage} from "../features/educations/EducationsPage";
import {PositionsPage} from "../features/positions/PositionsPage";


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path={PATH.main} element={<MainLayout/>}>
                <Route index element={<EmployeesPage/>}/>
                <Route path={PATH.educations} element={<EducationsPage/>}/>
                <Route path={PATH.positions} element={<PositionsPage/>}/>
            </Route>
        </Routes>
    )
}