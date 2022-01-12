/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

import { Link } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { css } from '@emotion/react'


import { TicketCardData, Priority } from "./types";
import PriorityLabel from "../../components/PriorityLabel";
import { getAvatarUrlByUserId } from "../user/utils";
import { DateAgoTickets } from "../../components/DateTickets";




interface Props {
    ticket: TicketCardData;
}

export default function TicketCard(props: Props) {
    const ticket = props.ticket;

    const authorName = ticket.authorName as string;

    return (
        <Grid item xs={1}>
            <Link to={ticket.id}>
                <Card>
                    <DateAgoTickets date={ticket.updatedAt} />
                    <PriorityLabel priority={ticket.priority} />
                    <div>{ticket.title}</div>

                    <Box css={css`
                            display: flex;
                            align-items: center;
                        `}
                    >
                        <Avatar 
                            alt={authorName.charAt(0)}
                            src={getAvatarUrlByUserId(ticket.authorId)}
                            css={css`margin: 15px 22px;`}
                        />
                        <div>{ticket.authorName}</div>
                    </Box>

                </Card>
            </Link>
        </Grid>

    )
}