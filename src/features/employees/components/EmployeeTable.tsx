import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {MappedEmployee} from "./MappedEmployee";
import {useAppSelector} from "../../../app/store";
import {getEmployees} from "../redux/selectors";

export const EmployeeTable = () => {

    const employees = useAppSelector(getEmployees)

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead style={{borderBottom: '2px solid black'}}>
                    <TableRow>
                        <TableCell>ФИО</TableCell>
                        <TableCell align="center">Должность</TableCell>
                        <TableCell align="center">Образование</TableCell>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map((employee) => <MappedEmployee key={employee.id} employee={employee}/>)}
                </TableBody>
            </Table>
        </TableContainer>
    );
}