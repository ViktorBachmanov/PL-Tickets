import React, { useContext, useEffect } from "react";
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";

import { Mode, RequestStatus } from "./types";
import { RootState } from '../../app/store';

import { defaultTicketData } from './ticketsSlice';
import TicketForm from './TicketForm';

import { RoutesPathes } from '../../constants';


interface Props {
    requestStatus: RequestStatus;
    beingSavedTicketId: string;
}


function CreateTicket(props: Props) {
    console.log(`CreateTicket process: `);

    
    if(props.requestStatus === RequestStatus.LOADING) {
        return <h2>Loading...</h2>;
    }
    
    if(props.beingSavedTicketId) {

        return <Navigate to={RoutesPathes.TICKETS + "/" + props.beingSavedTicketId} replace={true} />;
    }

   

    return <TicketForm mode={Mode.EDIT} />;  
};


function mapStateToProps(state: RootState) {
    return { 
        requestStatus: state.tickets.requestStatus,
        beingSavedTicketId: state.tickets.beingSavedTicketId,
        status: state.tickets.status,
     };
};


export default connect(mapStateToProps)(CreateTicket);
