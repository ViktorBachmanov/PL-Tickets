/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from '@emotion/react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';


export default function AppBarTickets() {
    return (
        <AppBar
            position='sticky'
            css={css`
                background: #F7F8FC;
            `}
        >
            <Button variant="contained" >Create</Button>
        </AppBar>
    )
}