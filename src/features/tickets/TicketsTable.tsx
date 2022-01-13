/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { css } from '@emotion/react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Avatar from '@mui/material/Avatar';

import { RootState } from '../../app/store';
import { TicketCardData, Priority } from "./types";
import PriorityLabel from "../../components/PriorityLabel";
import { DateTickets, DateAgoTickets } from "../../components/DateTickets";
import { getAvatarUrlByUserId } from "../user/utils";
import { Order } from "../pagination/types";
import DeleteTicketIcon from "../../components/DeleteTicketIcon";



interface Props {
    tickets: Array<TicketCardData>;
    priorityOrder: Order;
    togglePriorityOrder: any;
    dateOrder: Order;
    toggleDateOrder: any;
}

export default function TicketsTable(props: Props) {
    const userId = useSelector((state: RootState) => state.user.id);
    const lightMode = useSelector((state: RootState) => state.theme.lightStatus);

    const rows = props.tickets.map(ticket => {
        const authorName = ticket.authorName as string;
        //console.log(getAvatarUrlByUserId(ticket.authorId));

        const navigate = useNavigate();

        function handleClick() {
            navigate(ticket.id);
        }

        const isDeleteAvailable = ticket.authorId === userId && !ticket.isCompleted;

        const completedBackground = lightMode === "light" ? "background: #EBFFE6;"
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
                {/*<TableCell>{(new Date(ticket.updatedAt)).toLocaleString()}</TableCell>*/}
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
                    <TableCell>
                        Date
                        <TableSortLabel
                            active
                            direction={props.dateOrder}
                            onClick={() => { props.toggleDateOrder(); }}
                        />
                    </TableCell>
                    <TableCell>
                        Priority
                        <TableSortLabel
                            active
                            direction={props.priorityOrder}
                            onClick={() => { props.togglePriorityOrder(); }}
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