/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { connect } from 'react-redux';
import toast from 'react-hot-toast';

import { css } from '@emotion/react'

import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { deleteTicket as deleteTicketAction } from '../features/tickets/ticketsSlice';
import { ticketsDeletingMessages } from '../features/tickets/constants';


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
        const rslt = deleteTicket(ticketId).unwrap();
        toast.promise(rslt, ticketsDeletingMessages);
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
                css={css`margin: 0.25rem;`}
            />

            <CloseIcon
                onClick={handleCancel}
                css={css`margin: 0.25rem;`}
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