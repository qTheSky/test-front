import React, {FC} from "react";
import {useAppDispatch} from "../../app/store";
import {deleteEducation, updateEducation} from "./redux/educations.reducer";
import {IEducation} from "../../shared/types/education.interface";
import {UniversalListItem} from "../../shared/components/UniversalListItem";

export const MappedEducation: FC<{ education: IEducation }> = ({education}) => {
    const dispatch = useAppDispatch()

    const onUpdateEducation = (newTitle: string) => {
        dispatch(updateEducation({id: education.id, newTitle}))
    }
    const onDeleteEducation = () => {
        dispatch(deleteEducation({educationId: education.id}))
    }

    return <UniversalListItem title={education.title} onChange={onUpdateEducation} onDelete={onDeleteEducation}/>
}