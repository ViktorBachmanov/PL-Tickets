import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


import { Mode, Status } from "./types";
import { RequestStatus } from "../../constants";
import { RootState } from '../../app/store';

import { resetStatus as resetStatusAction,
        resetSavedTicketId as resetSavedTicketIdAction, } from './ticketsSlice';
import TicketForm from './TicketForm';

import { RoutesPathes } from '../../constants';
import { setTitle as setTitleAction } from "../title/titleSlice";



interface Props {
    requestStatus: RequestStatus;
    beingSavedTicketId: string;
    setTitle: any;
    status: Status;
    resetStatus: any;
    resetSavedTicketId: any;
}


function CreateTicket(props: Props) {

    useEffect(() => {
        props.setTitle("New ticket");

        return function clean() {
            if(props.status !== Status.SAVED) {
                 props.resetStatus();
            }
            props.resetSavedTicketId();
        }
    }, []);

    
    if(props.requestStatus === RequestStatus.LOADING) {
        return <h2>Loading...</h2>;
    }
    
    
    if(props.status === Status.SAVED) {
        return <Navigate to={RoutesPathes.TICKETS + "/" + props.beingSavedTicketId} replace={true} />;
    }    

    if(props.status === Status.NOT_SAVED) {
        toast.error('Error ticket creating');
    }

    return (
        <React.Fragment>
            <TicketForm mode={Mode.NEW} />
        </React.Fragment>
    )
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
    resetStatus: resetStatusAction,
    resetSavedTicketId: resetSavedTicketIdAction,
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateTicket);
