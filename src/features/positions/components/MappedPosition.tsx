import React, {FC} from "react";
import {deletePosition, updatePosition} from "../redux/positions.reducer";
import {IPosition} from "../../../shared/types/position.interface";
import {useAppDispatch} from "../../../app/store";
import {UniversalListItem} from "../../../shared/components/UniversalListItem";

export const MappedPosition: FC<{ position: IPosition }> = ({position}) => {
    const dispatch = useAppDispatch()

    const onPositionChanged = (newTitle: string) => {
        dispatch(updatePosition({id: position.id, newTitle}))
    }
    const onDeletePosition = () => {
        dispatch(deletePosition({positionId: position.id}))
    }


    return <UniversalListItem title={position.title} onChange={onPositionChanged} onDelete={onDeletePosition}/>
}