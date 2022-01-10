import React from "react";

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


interface Props {
    tickets: Array<TicketCardData>;
}

export default function TicketsTable(props: Props) {
    const rows = props.tickets.map(ticket => {
        const authorName = ticket.authorName as string;
        console.log(getAvatarUrlByUserId(ticket.authorId));
        
        return (
            <TableRow key={ticket.id}>
                <TableCell>
                    <Avatar alt={authorName.charAt(0)} src={getAvatarUrlByUserId(ticket.authorId)}/>
                    {ticket.title}
                </TableCell>
                <TableCell>{authorName}</TableCell>
                <TableCell>{ticket.updatedAt}</TableCell>
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
                            direction="asc"
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