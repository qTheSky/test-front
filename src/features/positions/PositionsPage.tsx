import {Container} from "@mui/material"
import {AddItemForm} from "../../shared/components/AddItemForm";
import {useAppDispatch, useAppSelector} from "../../app/store";
import React from "react";
import {getPositions} from "./redux/selectors";
import {MappedPosition} from "./components/MappedPosition";
import {createPosition} from "./redux/positions.reducer";

export const PositionsPage = () => {
    const positions = useAppSelector(getPositions)
    const dispatch = useAppDispatch()

    const onAddPosition = (title: string) => {
        dispatch(createPosition({title}))
    }


    return (
        <div>
            <Container>
                <div style={{marginTop: '10px', textAlign: 'center'}}>
                    <AddItemForm addItemCallBack={onAddPosition} label='Добавить новую должность'/>
                </div>
                {positions.map(p => <MappedPosition key={p.id} position={p}/>)}
            </Container>
        </div>
    )
}