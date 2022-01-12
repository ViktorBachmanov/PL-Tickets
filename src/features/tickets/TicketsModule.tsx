import React from "react";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';

import { TicketCardData } from "./types";
import TicketCard from "./TicketCard";


interface Props {
    tickets: Array<TicketCardData>;
}


export default function TicketsModule(props: Props) {
    let totalColumns: number;
    const theme = useTheme();

    if(useMediaQuery(theme.breakpoints.down("md"))) {
        totalColumns = 2;
    }
    else {
        totalColumns = 3;
    }

    const tikckets = props.tickets.map((ticket: TicketCardData) => 
            
            <TicketCard 
                key={ticket.id} 
                ticket={ticket} 
            />            
    )

    return (
        <Grid                 
                container 
                columns={totalColumns}
                spacing={1}
            >
                {tikckets}
        </Grid>
    )
}