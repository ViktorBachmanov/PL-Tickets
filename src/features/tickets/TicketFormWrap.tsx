import React, { useContext, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Timestamp } from "firebase/firestore";

import { Priority, Mode, IFormInput } from "./types";
import { RootState } from '../../app/store';

import { TicketCardData, getTicketDataById, defaultTicketData } from './ticketsSlice';
import TicketForm from './TicketForm';


interface Props {
    mode: Mode;
};


export default function TicketFormWrap(props: Props) {
    let ticketId: string | undefined;
    let tickets: Array<TicketCardData>;
    let ticketData: TicketCardData | undefined;

    if(props.mode === Mode.READ) {
        const { id } = useParams();
        if(id) {
            ticketId = id;
            tickets = useSelector((state: RootState) => state.tickets.list);
            if(tickets) {
                ticketData = getTicketDataById(tickets, ticketId);
            }
        }
    }
   
    
    //useEffect(() => {           
        

        if(!ticketData) {
            ticketData = defaultTicketData();
        }
        /*
        return function cleanup() {
            ticketData = null;
        }*/
    //}, []);

    console.log(`TicketFormWrap process: `, ticketData);

  

    return <TicketForm mode={props.mode} ticket={ticketData}/>;  
};

