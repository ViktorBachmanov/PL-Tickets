/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";


import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { css } from '@emotion/react'

import { RootState } from '../../app/store';
import { TicketCardData, Priority } from "./types";
import PriorityLabel from "../../components/PriorityLabel";
import DeleteTicketIcon from "../../components/DeleteTicketIcon";
import { getAvatarUrlByUserId } from "../user/utils";
import { DateTickets, DateAgoTickets } from "../../components/DateTickets";
import { LightStatus } from "../theme/types";



interface Props {
    ticket: TicketCardData;
}

export default function TicketCard(props: Props) {
    const { ticket } = props;
    const userId = useSelector((state: RootState) => state.user.id)
    const lightMode = useSelector((state: RootState) => state.theme.lightStatus);


    const authorName = ticket.authorName as string;
    const authorId = ticket.authorId;

    const isDeleteAvailable = authorId === userId && !ticket.isCompleted;

    const completedBackground = lightMode === LightStatus.LIGHT ? "background: #EBFFE6;"
                                                            : "background: #004d40;"

    return (
        <Grid item xs={1}>
            <Link to={ticket.id}>
                <Card css={css`
                        padding: 1rem;
                        ${ticket.isCompleted && completedBackground}
                    `}
                >
                    <Box css={css`
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                        `}
                    >
                        <DateTickets date={ticket.updatedAt} />
                        <PriorityLabel 
                            priority={ticket.priority} 
                        />     
                        {isDeleteAvailable && 
                                <DeleteTicketIcon ticketId={ticket.id} />
                        }
                    </Box>

                    <div>{ticket.title}</div>

                    <DateAgoTickets
                             date={ticket.updatedAt}
                        />

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





