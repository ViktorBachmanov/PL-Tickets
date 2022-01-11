/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
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

import { TicketCardData, Priority } from "./types";
import PriorityLabel from "../../components/PriorityLabel";
import { getAvatarUrlByUserId } from "../user/utils";
import { Order } from "../pagination/types";


interface Props {
    tickets: Array<TicketCardData>;
    priorityOrder: Order;
    togglePriorityOrder: any;
}

export default function TicketsTable(props: Props) {
    const rows = props.tickets.map(ticket => {
        const authorName = ticket.authorName as string;
        //console.log(getAvatarUrlByUserId(ticket.authorId));

        const navigate = useNavigate();

        function handleClick() {
            navigate(ticket.id);
        }
        
        return (
            <TableRow 
                key={ticket.id} 
                onClick={handleClick}
                css={css`cursor: pointer;`}
            >
                <TableCell>
                    <Avatar alt={authorName.charAt(0)} src={getAvatarUrlByUserId(ticket.authorId)}/>
                    {ticket.title}
                </TableCell>
                <TableCell>{authorName}</TableCell>
                <TableCell>{(new Date(ticket.updatedAt)).toLocaleString()}</TableCell>
                <TableCell>
                    <PriorityLabel priority={ticket.priority} />
                </TableCell>
                <TableCell/>
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
                            direction="desc"
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