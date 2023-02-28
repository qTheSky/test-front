import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {BasicModal} from "../../../../shared/components/BasicModal";
import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../../../app/store";
import {getEducations} from "../../../educations/redux/selectors";
import {getPositions} from "../../../positions/redux/selectors";
import {IPosition} from "../../../../shared/types/position.interface";
import {IEducation} from "../../../../shared/types/education.interface";

interface IProps {
    title: string
    open: boolean
    closeModal: () => void
    handleSave: (name: string, positionId: number, educationId: number) => void
}

export const AddEmployeeModal = ({open, closeModal, title, ...props}: IProps) => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState<null | IPosition>(null);
    const [education, setEducation] = useState<null | IEducation>(null);
    const educations = useAppSelector(getEducations)
    const positions = useAppSelector(getPositions)

    function onPositionChanged(event: SelectChangeEvent<string>) {
        const position = positions.find(p => p.title === event.target.value)!
        setPosition(position)
    }

    function onEducationChanged(event: SelectChangeEvent<string>) {
        const education = educations.find(p => p.title === event.target.value)!
        setEducation(education)
    }

    const handleSave = () => {
        if (!name || !position || !education) {
            alert('Введите все значения')
            return
        }
        props.handleSave(name, position.id, education?.id)
    }
    useEffect(() => {
        return () => {
            setName('')
            setEducation(null)
            setPosition(null)
        }
    }, [])

    return (
        <BasicModal open={open}
                    handleClose={closeModal}
                    title={title}>
            <div style={{marginTop: '5px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <TextField label="Введите имя сотрудника"
                           variant='standard'
                           onChange={(e) => setName(e.currentTarget.value)}/>
                <FormControl variant="standard">
                    <InputLabel id="education">Выберите образование</InputLabel>
                    <Select labelId="education"
                            label='Выберите образование'
                            id="demo-simple-select-standard"
                            value={education?.title}
                            onChange={onEducationChanged}>
                        {educations.map(e => <MenuItem key={e.id} value={e.title}>{e.title}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel id="position">Выберите Должность</InputLabel>
                    <Select labelId="position"
                            label='Выберите Должность'
                            value={position?.title}
                            onChange={onPositionChanged}>
                        {positions.map(e => <MenuItem key={e.id} value={e.title}>{e.title}</MenuItem>)}
                    </Select>
                </FormControl>
            </div>
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '40px'}}>
                    <Button variant="outlined" onClick={closeModal}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>Save</Button>
                </div>
            </div>
        </BasicModal>
    )
}