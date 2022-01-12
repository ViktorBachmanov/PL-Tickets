import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";

import { Mode } from "./types";
import { RequestStatus } from "../../constants";
import { RootState } from '../../app/store';

import { defaultTicketData } from './ticketsSlice';
import TicketForm from './TicketForm';

import { RoutesPathes } from '../../constants';
import { setTitle as setTitleAction } from "../title/titleSlice";



interface Props {
    requestStatus: RequestStatus;
    beingSavedTicketId: string;
    setTitle: any;
}


function CreateTicket(props: Props) {
    //console.log(`CreateTicket process: `);

    useEffect(() => {
        props.setTitle("New ticket");
    }, []);

    
    if(props.requestStatus === RequestStatus.LOADING) {
        return <h2>Loading...</h2>;
    }
    
    if(props.beingSavedTicketId) {

        return <Navigate to={RoutesPathes.TICKETS + "/" + props.beingSavedTicketId} replace={true} />;
    }

   

    return <TicketForm mode={Mode.NEW} />;  
};


function mapStateToProps(state: RootState) {
    return { 
        requestStatus: state.tickets.requestStatus,
        beingSavedTicketId: state.tickets.beingSavedTicketId,
        status: state.tickets.status,
     };
};

const mapDispatchToProps = {
    setTitle: setTitleAction,
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateTicket);
