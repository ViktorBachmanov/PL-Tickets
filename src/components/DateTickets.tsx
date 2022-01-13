/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { css } from '@emotion/react'


interface Props {
    date: number;   // milliseconds
}

export function DateTickets(props: Props) {

    const date = new Date(props.date);
 
    return (
        <Box>
            {date.toLocaleString()}
        </Box>
    )
}


export function DateAgoTickets(props: Props) {
    
    let ago = (Date.now() - props.date) / 1000 / 60 / 60 / 24;
    ago = Math.round(ago);


    let text: string;

    switch(ago) {
        case 0:
            text = 'Updated today';
            break;
        case 1:
            text = `Updated 1 day ago`;
            break;
        default:
            text = `Updated ${ago} days ago`;
            break;
    }
 
    return (
        <Typography
                variant="subtitle2" 
                component="div"
                css={css`color: #C5C7CD;`}
        >
            {text}
        </Typography>
    )
}
