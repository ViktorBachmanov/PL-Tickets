/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { OrderByDirection } from "firebase/firestore";

import { css } from '@emotion/react'
import Table from '@mui/material/Table';
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
    togglePriorityOrder: any;
    dateOrder: OrderByDirection;
    toggleDateOrder: any;
    setCurrentTicketById: any;
}

export default function TicketsTable(props: Props) {
    const userId = useSelector((state: RootState) => state.user.id);
    const lightMode = useSelector((state: RootState) => state.theme.lightStatus);

    const rows = props.tickets.map(ticket => {
        const authorName = ticket.authorName as string;

        const navigate = useNavigate();

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
                    <Avatar alt={authorName.charAt(0)} src={getAvatarUrlByUserId(ticket.authorId)}/>
                    {ticket.title}
                    <DateAgoTickets date={ticket.updatedAt} />
                </TableCell>
                <TableCell>{authorName}</TableCell>
                
                <TableCell>
                    <DateTickets date={ticket.updatedAt}/>
                </TableCell>

                <TableCell>
                    <PriorityLabel priority={ticket.priority} />
                </TableCell>
                <TableCell>
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
                    <TableCell>Ticket details</TableCell>
                    <TableCell>Owner name</TableCell>
                    <TableCell
                        onClick={() => { props.toggleDateOrder(); }}
                        css={css`
                            cursor: pointer;
                        `}
                    >
                        Date
                        <TableSortLabel
                            active
                            direction={props.dateOrder}
                        />
                    </TableCell>
                    <TableCell
                        onClick={() => { props.togglePriorityOrder(); }}
                        css={css`
                            cursor: pointer;
                        `}
                    >
                        Priority
                        <TableSortLabel
                            active
                            direction={props.priorityOrder}
                        />
                    </TableCell>
                    <TableCell />
                </TableRow>
            </TableHead>

            <TableBody>
                {rows}
            </TableBody>
        </Table>
    )
}