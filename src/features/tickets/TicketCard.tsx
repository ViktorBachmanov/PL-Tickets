import React from "react";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

import { Priority } from "./types";
import { TicketCardData } from "./ticketsSlice";


interface Props {
    data: TicketCardData;
}

export default function TicketCard(props: Props) {
    return (
        <Grid item xs={1}>
            <Card>
                <div>{props.data.title}</div>
                <div>{props.data.authorName}</div>

            </Card>
        </Grid>

    )
}