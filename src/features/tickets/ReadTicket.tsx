import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Timestamp } from "firebase/firestore";

import { Mode, RequestStatus } from "./types";
import { RootState } from '../../app/store';

import { TicketCardData,
         getTicketDataById,
         defaultTicketData,
         loadTicketById as loadTicketByIdAction,
         //resetRequestStatus as resetRequestStatusAction,
        } from './ticketsSlice';
import TicketForm from './TicketForm';


interface Props {
    requestStatus: RequestStatus;
    currentTicket: TicketCardData;
    loadTicketById: any;
    //resetRequestStatus: any;
}


function ReadTicket(props: Props) {
    console.log('ReadTicket', ++ReadTicket.count);

    //props.resetRequestStatus();

    const { id } = useParams();

    if(id && !props.currentTicket.id && props.requestStatus !== RequestStatus.LOADING) {
        props.loadTicketById(id);
    }  


    if(props.requestStatus !== RequestStatus.DONE) {

        return <h2>Loading...</h2>;
    }        


    //return <h3>End</h3>;

    return <TicketForm mode={Mode.READ} />;  
};

ReadTicket.count = 0;

function mapStateToProps(state: RootState) {
    return { 
        requestStatus: state.tickets.requestStatus,
        currentTicket: state.tickets.currentTicket,
    };
};

const mapDispatchToProps = {
    loadTicketById: loadTicketByIdAction,
    //resetRequestStatus: resetRequestStatusAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadTicket);