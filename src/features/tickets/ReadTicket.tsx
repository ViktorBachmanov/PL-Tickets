import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useParams, Navigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Timestamp } from "firebase/firestore";

import { Mode, Status } from "./types";
import { RequestStatus, RoutesPathes } from "../../constants";
import { RootState } from '../../app/store';

import { loadTicketById as loadTicketByIdAction,
        resetStatus as resetStatusAction, } from './ticketsSlice';
import { TicketCardData } from "./types";
import TicketForm from './TicketForm';

import { setTitle as setTitleAction } from "../title/titleSlice";




interface Props {
    requestStatus: RequestStatus;
    currentTicket: TicketCardData;
    loadTicketById: any;
    //resetRequestStatus: any;
    status: Status;
    //resetStatus: any;
    setTitle: any;
    resetStatus: any;
}


function ReadTicket(props: Props) {
    console.log('ReadTicket', ++ReadTicket.count);

    //props.resetRequestStatus();

    const { id } = useParams();

    useEffect(() => {
        console.log('ReadTicket useEffect');
        if(props.status === Status.SAVED) {
            toast.success('Ticket created successfully');
        }

        props.setTitle("");
        if(id) {
            props.loadTicketById(id)
                .unwrap()
                .then((ticket: TicketCardData) => { props.setTitle(ticket.title); })
        }

        return function clean() {
            props.resetStatus();
        }
    }, [])
     
    /*
    if(props.currentTicket.title) {
        props.setTitle(props.currentTicket.title);
    }*/




    if(props.status === Status.DELETED) {

        return <Navigate to={RoutesPathes.TICKETS} replace={true} />;
    }
    

    if(props.requestStatus === RequestStatus.LOADING) {

        return <h2>Loading...</h2>;
    }  
    
    


    //return <h3>End</h3>;

    return (
        <React.Fragment>
            <TicketForm mode={Mode.READ} />
            <Toaster /> 
        </React.Fragment>
    )
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
    resetStatus: resetStatusAction,
    setTitle: setTitleAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadTicket);