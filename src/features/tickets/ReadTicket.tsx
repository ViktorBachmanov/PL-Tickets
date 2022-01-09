import React, { useContext, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Timestamp } from "firebase/firestore";

import { Priority, Mode, IFormInput } from "./types";
import { RootState } from '../../app/store';

import { TicketCardData, getTicketDataById, defaultTicketData } from './ticketsSlice';
import TicketForm from './TicketForm';




export default function ReadTicket() {
    let ticketId: string | undefined;
    let tickets: Array<TicketCardData>;
    let ticketData: TicketCardData | undefined;

    const { id } = useParams();
    if(id) {
        ticketId = id;
        tickets = useSelector((state: RootState) => state.tickets.list);
        if(tickets) {
            ticketData = getTicketDataById(tickets, ticketId);
        }
    } 
    
        

    if(!ticketData) {
        ticketData = defaultTicketData();
    }
        

    console.log(`TicketFormWrap process: `, ticketData);

  

    return <TicketForm mode={Mode.READ} ticket={ticketData}/>;  
};

