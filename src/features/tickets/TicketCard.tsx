import React from "react";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

import { Link } from "react-router-dom";

import { Priority } from "./types";
import { TicketCardData } from "./types";


interface Props {
    data: TicketCardData;
}

export default function TicketCard(props: Props) {
    return (
        <Grid item xs={1}>
            <Link to={props.data.id}>
                <Card>
                    <div>{props.data.title}</div>
                    <div>{props.data.authorName}</div>

                </Card>
            </Link>
        </Grid>

    )
}