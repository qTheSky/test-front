import {Container} from '@mui/material';
import React from 'react';
import {AddEmployee} from "./components/add-employee-modal/AddEmployee";
import {EmployeeTable} from "./components/EmployeeTable";

export const EmployeesPage = () => {
    return (
        <div>
            <Container>
                <AddEmployee/>
                <EmployeeTable/>
            </Container>
        </div>
    );
};

