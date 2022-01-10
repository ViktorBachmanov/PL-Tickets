import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useParams, Navigate } from "react-router-dom";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Timestamp } from "firebase/firestore";

import { Mode, RequestStatus, Status } from "./types";
import { RootState } from '../../app/store';

import { TicketCardData,
         getTicketDataById,
         defaultTicketData,
         loadTicketById as loadTicketByIdAction,
         //resetRequestStatus as resetRequestStatusAction,
         //resetStatus as resetStatusAction,
        } from './ticketsSlice';
import TicketForm from './TicketForm';

import { RoutesPathes } from '../../constants';



interface Props {
    requestStatus: RequestStatus;
    currentTicket: TicketCardData;
    loadTicketById: any;
    //resetRequestStatus: any;
    status: Status;
    //resetStatus: any;
}


function ReadTicket(props: Props) {
    console.log('ReadTicket', ++ReadTicket.count);

    //props.resetRequestStatus();

    const { id } = useParams();

    useEffect(() => {
        console.log('Use effect');
        if(id) {
            props.loadTicketById(id);
        } 
    }, [])
     


    if(props.requestStatus !== RequestStatus.DONE) {

        return <h2>Loading...</h2>;
    }  
    
    if(props.status === Status.DELETED) {

        return <Navigate to={RoutesPathes.TICKETS} replace={true} />;
    }


    //return <h3>End</h3>;

    return <TicketForm mode={Mode.READ} />;  
};

ReadTicket.count = 0;

function mapStateToProps(state: RootState) {
    return { 
        requestStatus: state.tickets.requestStatus,
        currentTicket: state.tickets.currentTicket,
        status: state.tickets.status,
    };
};

const mapDispatchToProps = {
    loadTicketById: loadTicketByIdAction,
    //resetRequestStatus: resetRequestStatusAction,
    //resetStatus: resetStatusAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadTicket);