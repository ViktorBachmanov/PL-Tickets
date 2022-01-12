import React from "react";

import Box from '@mui/material/Box';


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
        <Box>
            {text}
        </Box>
    )
}
