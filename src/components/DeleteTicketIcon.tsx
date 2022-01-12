import React from "react";
import { connect } from 'react-redux';


import DeleteIcon from '@mui/icons-material/Delete';

import { deleteTicket as deleteTicketAction } from '../features/tickets/ticketsSlice';


interface Props {
    ticketId: string;
    deleteTicket: any;
}


function DeleteTicketIcon(props: Props) {
    const { ticketId, deleteTicket } = props;
    return (
            <DeleteIcon />
    )
}

/*
function mapStateToProps(state: RootState) {
    return { 
        userId: state.user.id,       
    };
};*/

const mapDispatchToProps = {
    deleteTicket: deleteTicketAction,
   
};

export default connect(null, mapDispatchToProps)(DeleteTicketIcon);