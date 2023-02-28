import React, {FC} from 'react';
import {FormControl, IconButton, MenuItem, Select, SelectChangeEvent, TableCell, TableRow} from "@mui/material";
import {IEmployee} from "../types/employee.interface";
import DeleteIcon from '@mui/icons-material/Delete';
import {EditableSpan} from '../../../shared/components/EditableSpan';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {deleteEmployee, updateEmployee} from "../redux/employees.reducer";
import {getEducations} from "../../educations/redux/selectors";
import {getPositions} from "../../positions/redux/selectors";

export const MappedEmployee: FC<{ employee: IEmployee }> = ({employee}) => {
    const dispatch = useAppDispatch()
    const educations = useAppSelector(getEducations)
    const positions = useAppSelector(getPositions)

    const onPositionChanged = (event: SelectChangeEvent) => {
        const position = positions.find(p => p.title === event.target.value)!
        dispatch(updateEmployee({id: employee.id, updateModel: {positionId: position.id}}))
    }

    const onEducationChanged = (event: SelectChangeEvent) => {
        const education = educations.find(p => p.title === event.target.value)!
        dispatch(updateEmployee({id: employee.id, updateModel: {educationId: education.id}}))
    }


    const onNameChanged = (newName: string) => {
        dispatch(updateEmployee({id: employee.id, updateModel: {name: newName}}))
    }

    const onDeleteClick = () => {
        dispatch(deleteEmployee(employee.id))
    }

    return (
        <TableRow key={employee.id}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell component="th" scope="row"> <EditableSpan value={employee.name}
                                                                 onChange={onNameChanged}/>
            </TableCell>

            <TableCell align="center">
                <FormControl variant="standard">
                    <Select value={employee.info.position.title}
                            onChange={onPositionChanged}>
                        {positions.map(p => <MenuItem key={p.id} value={p.title}>{p.title}</MenuItem>)}
                    </Select>
                </FormControl>
            </TableCell>
            <TableCell align="center">
                <FormControl variant="standard">
                    <Select value={employee.info.education.title}
                            onChange={onEducationChanged}>
                        {educations.map(e => <MenuItem key={e.id} value={e.title}>{e.title}</MenuItem>)}
                    </Select>
                </FormControl>
            </TableCell>
            <TableCell align="right">
                <IconButton color='error' onClick={onDeleteClick}><DeleteIcon/></IconButton>
            </TableCell>
        </TableRow>
    );
};