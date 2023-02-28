import {Container} from "@mui/material";
import {AddItemForm} from "../../shared/components/AddItemForm";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {getEducations} from "./redux/selectors";
import {MappedEducation} from "./MappedEducation";
import {createEducation} from "./redux/educations.reducer";

export const EducationsPage = () => {
    const educations = useAppSelector(getEducations)
    const dispatch = useAppDispatch()
    const onAddEducation = (title: string) => {
        dispatch(createEducation({title}))
    }
    return (
        <div>
            <Container>
                <div style={{marginTop: '10px', textAlign: 'center'}}>
                    <AddItemForm addItemCallBack={onAddEducation} label='Добавить новое образование'/>
                </div>
                {educations.map(e => <MappedEducation key={e.id} education={e}/>)}
            </Container>
        </div>
    )
}