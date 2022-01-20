/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { connect, ConnectedProps } from 'react-redux';
import toast from 'react-hot-toast';

import { css } from '@emotion/react'

import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { deleteTicket as deleteTicketAction } from '../features/tickets/ticketsSlice';
import { ticketsDeletingMessages } from '../features/tickets/constants';


const mapDispatchToProps = {
    deleteTicket: deleteTicketAction,
   
};

const connector = connect(null, mapDispatchToProps);

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>


type Props = PropsFromRedux & {
    ticketId: string;
}


enum ViewMode { NORMAL, CONFIRM }


function DeleteTicketIcon(props: Props) {
    const { ticketId, deleteTicket } = props;

    const [view, setView] = useState(ViewMode.NORMAL);

    function handleOnClick(ev: React.MouseEvent) {
        ev.preventDefault();
        ev.stopPropagation();
        setView(ViewMode.CONFIRM);
    }

    function handleConfirmDelete(ev: React.MouseEvent) {
        ev.preventDefault();
        ev.stopPropagation();
        const rslt = deleteTicket(ticketId).unwrap();
        toast.promise(rslt, ticketsDeletingMessages);
    }

    function handleCancel(ev: React.MouseEvent) {
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
        <Box
            css={css`
                display: flex;
            `}
        >
            <CheckIcon
                onClick={handleConfirmDelete}
                color="success"
                css={css`margin: 0.25rem;`}
            />

            <CloseIcon
                onClick={handleCancel}
                color="error"
                css={css`margin: 0.25rem;`}
            />

        </Box>

    )

    const viewElem = view === ViewMode.NORMAL ? normalElem : confirmElem;


    return viewElem;
}


export default connector(DeleteTicketIcon);