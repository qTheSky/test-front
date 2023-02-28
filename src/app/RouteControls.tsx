import React from 'react';
import {Button, Container} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import {PATH} from "./RouteVariables";

export const RouteControls = () => {
    const {pathname} = useLocation()

    return (
        <div>
            <Container>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Link to={PATH.main} style={{width: '100%'}}>
                        <Button fullWidth
                                variant={pathname === PATH.main ? "contained" : 'outlined'}>Сотрудники</Button>
                    </Link>
                    <Link to={PATH.positions} style={{width: '100%'}}>
                        <Button fullWidth
                                variant={pathname === PATH.positions ? "contained" : 'outlined'}>Должности</Button>
                    </Link>
                    <Link to={PATH.educations} style={{width: '100%'}}>
                        <Button fullWidth
                                variant={pathname === PATH.educations ? "contained" : 'outlined'}>Образования</Button>
                    </Link>
                </div>
            </Container>
        </div>
    );
};
