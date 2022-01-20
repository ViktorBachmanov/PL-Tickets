/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
import { useSelector } from 'react-redux';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useNavigate } from "react-router-dom";

import { OrderByDirection } from "firebase/firestore";

import { css } from '@emotion/react'
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Avatar from '@mui/material/Avatar';

import { RootState } from '../../app/store';
import { TicketCardData } from "./types";
import PriorityLabel from "../../components/PriorityLabel";
import { DateTickets, DateAgoTickets } from "../../components/DateTickets";
import { getAvatarUrlByUserId } from "../user/utils";
import DeleteTicketIcon from "../../components/DeleteTicketIcon";
import { LightStatus } from "../theme/types";



interface Props {
    tickets: Array<TicketCardData>;
    priorityOrder: OrderByDirection;
    togglePriorityOrder: ActionCreatorWithoutPayload<string>;
    dateOrder: OrderByDirection;
    toggleDateOrder: ActionCreatorWithoutPayload<string>;
    setCurrentTicketById: ActionCreatorWithPayload<string, string>;
}

export default function TicketsTable(props: Props) {
    const userId = useSelector((state: RootState) => state.user.id);
    const lightMode = useSelector((state: RootState) => state.theme.lightStatus);

    const navigate = useNavigate();

    const rows = props.tickets.map(ticket => {
        const authorName = ticket.authorName as string;

        function handleClick() {
            props.setCurrentTicketById(ticket.id);
            navigate(ticket.id);
        }

        const isDeleteAvailable = ticket.authorId === userId && !ticket.isCompleted;

        const completedBackground = lightMode === LightStatus.LIGHT ? "background: #EBFFE6;"
                                                            : "background: #004d40;"
        
        return (
            <TableRow 
                key={ticket.id} 
                onClick={handleClick}
                css={css`
                    cursor: pointer;
                    ${ticket.isCompleted && completedBackground}
                `}
            >
                <TableCell>
                    <div
                         css={css`
                            display: flex;
                            align-items: center;
                        `}
                    >
                        <Avatar 
                            alt={authorName.charAt(0)} 
                            src={getAvatarUrlByUserId(ticket.authorId)}
                            css={css`
                                margin-right: 1rem;
                            `}
                        />
                        <div>
                            {ticket.title}
                            <DateAgoTickets date={ticket.updatedAt} />
                        </div>
                    </div>
                </TableCell>
                <TableCell>{authorName}</TableCell>
                
                <TableCell>
                    <DateTickets date={ticket.updatedAt}/>
                </TableCell>

                <TableCell
                    align="center"
                    padding="none"
                >
                    <PriorityLabel priority={ticket.priority} />
                </TableCell>
                <TableCell 
                    align="center"
                >
                    {isDeleteAvailable && 
                        <DeleteTicketIcon ticketId={ticket.id} />
                    }
                </TableCell>
            </TableRow>
            
        )
    });



    
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Box color="text.secondary">Ticket details</Box>
                    </TableCell>
                    <TableCell>
                        <Box color="text.secondary">Owner name</Box>
                    </TableCell>
                    <TableCell
                        onClick={() => { props.toggleDateOrder(); }}
                        css={css`
                            cursor: pointer;
                        `}
                    >
                        <Box style={{display: "flex"}} color="text.secondary">
                        Date
                        <TableSortLabel
                            active
                            direction={props.dateOrder}
                        />
                        </Box>
                    </TableCell>
                    <TableCell
                        onClick={() => { props.togglePriorityOrder(); }}
                        padding="none"
                        align="center"
                        css={css`
                            cursor: pointer;
                        `}
                    >
                        <Box style={{display: "flex"}} color="text.secondary">
                        Priority
                        <TableSortLabel
                            active
                            direction={props.priorityOrder}
                        />
                        </Box>
                    </TableCell>

                    <TableCell 
                        css={css`
                            min-width: 100px;
                            `}
                    />
                </TableRow>
            </TableHead>

            <TableBody>
                {rows}
            </TableBody>
        </Table>
    )
}