import React, { useState } from "react";
import { connect } from 'react-redux';


import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { deleteTicket as deleteTicketAction } from '../features/tickets/ticketsSlice';


interface Props {
    ticketId: string;
    deleteTicket: any;
}


enum ViewMode { NORMAL, CONFIRM };


function DeleteTicketIcon(props: Props) {
    const { ticketId, deleteTicket } = props;

    const [view, setView] = useState(ViewMode.NORMAL);

    function handleOnClick(ev: any) {
        ev.preventDefault();
        ev.stopPropagation();
        setView(ViewMode.CONFIRM);
    }

    function handleConfirmDelete(ev: any) {
        ev.preventDefault();
        ev.stopPropagation();
        deleteTicket(ticketId);
    }

    function handleCancel(ev: any) {
        ev.preventDefault();
        ev.stopPropagation();
        setView(ViewMode.NORMAL);
    }

    

    const normalElem = (
        <DeleteIcon 
            onClick={handleOnClick}
        />
    )

    const confirmElem = (
        <Box>
            <CheckIcon
                onClick={handleConfirmDelete}
            />

            <CloseIcon
                onClick={handleCancel}
            />

        </Box>

    )

    const viewElem = view === ViewMode.NORMAL ? normalElem : confirmElem;


    return viewElem;
}


const mapDispatchToProps = {
    deleteTicket: deleteTicketAction,
   
};

export default connect(null, mapDispatchToProps)(DeleteTicketIcon);