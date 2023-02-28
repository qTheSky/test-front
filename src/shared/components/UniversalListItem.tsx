import React, {FC} from 'react';
import {EditableSpan} from "./EditableSpan";
import {IconButton, Paper} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const UniversalListItem: FC<{ title: string, onChange: (newTitle: string) => void, onDelete: () => void }> = ({
                                                                                                                         title,
                                                                                                                         onChange,
                                                                                                                         onDelete
                                                                                                                     }) => {
    return (
        <Paper style={{
            width: '100%',
            fontWeight: 'bold',
            fontSize: '30px',
            padding: '10px',
            margin: 'auto',
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <EditableSpan value={title} onChange={onChange}/>
            <IconButton color='error' onClick={onDelete}><DeleteIcon/></IconButton>
        </Paper>
    );
};
