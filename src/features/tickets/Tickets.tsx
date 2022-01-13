/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


import { css } from '@emotion/react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';

import { RoutesPathes } from "../../constants";

import { resetStatus as resetStatusAction,
        resetRequestStatus as resetRequestStatusAction,
        resetCurrentTicket as resetCurrentTicketAction,
        getTotalDocs as getTotalDocsAction } from "./ticketsSlice";
import { RootState } from '../../app/store';
import { loadPage as loadPageAction,
        setTicketsPerPage as setTicketsPerPageAction,
        setCurrentPage as setCurrentPageAction,
        togglePriorityOrder as togglePriorityOrderAction,
        toggleDateOrder as toggleDateOrderAction } from "../pagination/paginationSlice";
import { setTitle as setTitleAction } from "../title/titleSlice";
import { Order } from "../pagination/types";
import { ticketsPerPageOptions } from "../pagination/constants";
import { RequestStatus } from "../../constants";
import TicketsTable from "./TicketsTable";
import { Status, TicketCardData, viewRep } from "./types";
import ViewToggle from "./ViewToggle";
import TicketsModule from "./TicketsModule";



interface Props {
    
    resetStatus: any;
    resetRequestStatus: any;
    resetCurrentTicket: any;
    getTotalDocs: any;
    loadPage: any;
    totalTickets: number;
    requestStatus: RequestStatus;
    setTitle: any;
    ticketsList: Array<TicketCardData>;
    setTicketsPerPage: any;
    setCurrentPage: any;
    currentPage: number;
    ticketsPerPage: number;
    togglePriorityOrder: any;
    priorityOrder: Order;
    toggleDateOrder: any;
    dateOrder: Order;
    status: Status;
}

function Tickets(props: Props) {
    const navigate = useNavigate();
    

    useEffect(() => {
        if(props.status === Status.DELETED) {
            toast.success('Ticket has been deleted');
        }
        props.resetStatus();
        props.resetCurrentTicket();
        props.loadPage();
        props.getTotalDocs();
        props.setTitle("Tickets");
        
        return function clean() {
            props.resetRequestStatus();
        }
    }, []);


    const [view, setView] = React.useState(viewRep.list);    

    

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        
        Tickets.isFiltersChanged = true;
        props.setCurrentPage(newPage);
        
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const rowsPerPage = parseInt(event.target.value, 10);
        
        Tickets.isFiltersChanged = true;
        props.setTicketsPerPage(rowsPerPage);
        
    };

    const handleTogglePriorityOrder = () => {
        Tickets.isFiltersChanged = true;
        props.togglePriorityOrder();
    }

    const handleToggleDateOrder = () => {
        Tickets.isFiltersChanged = true;
        props.toggleDateOrder();
    }


    if(Tickets.isFiltersChanged) {
        console.log('Tickets.isFiltersChanged: ', Tickets.isFiltersChanged)
        Tickets.isFiltersChanged = false;
        setTimeout(() => { props.loadPage(); }, 0);
        return <h2>Loading...</h2>;
    }

    if(props.status === Status.DELETED) {
        setTimeout(() => { 
            toast.success('Ticket has been deleted');
            props.resetStatus();
            props.loadPage(); 
        }, 0);        
    }

    if(props.requestStatus === RequestStatus.LOADING || !props.totalTickets) {
        return <h2>Loading...</h2>;
    } 

    

    let viewComp;

    if(view === viewRep.list) {
        viewComp = (
            <TicketsTable 
                tickets={props.ticketsList}
                priorityOrder={props.priorityOrder}
                dateOrder={props.dateOrder}
                togglePriorityOrder={handleTogglePriorityOrder}
                toggleDateOrder={handleToggleDateOrder}
            />
        )
    }
    else {
        viewComp = (
            <TicketsModule
                tickets={props.ticketsList}
                
            />
        )
    }

    return (
        <Box
            css={css`
                border: 1px solid #DFE0EB;
                border-radius: 8px;
            `}
        >

            <Box
                css={css`
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                `}
            >
                <Typography 
                    variant="h6" 
                    component="div"
                    css={css`margin-right: auto; margin-left: 1rem;`}
                >
                    All tickets
                 </Typography>

                <Button
                    variant="contained" 
                    onClick={() => {navigate(RoutesPathes.CREATE)}}
                >
                    Create
                </Button>

                <ViewToggle view={view} setView={setView}/>
            </Box>

            
            {viewComp}
            

            <TablePagination
                component="div"
                count={props.totalTickets}
                page={props.currentPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={ticketsPerPageOptions}
                rowsPerPage={props.ticketsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Toaster /> 

        </Box>

    )
}

Tickets.isFiltersChanged = false;

function mapStateToProps(state: RootState) {
    return { 
        ticketsList: state.pagination.tickets,
        totalTickets: state.tickets.counter,
        requestStatus: state.pagination.status,
        currentPage: state.pagination.currentPage,
        ticketsPerPage: state.pagination.ticketsPerPage,
        priorityOrder: state.pagination.priorityOrder,
        dateOrder: state.pagination.dateOrder,
        status: state.tickets.status,
    };
};

const mapDispatchToProps = {
   
    resetStatus: resetStatusAction,
    resetRequestStatus: resetRequestStatusAction,
    resetCurrentTicket: resetCurrentTicketAction,
    getTotalDocs: getTotalDocsAction,
    loadPage: loadPageAction,
    setTitle: setTitleAction,
    setTicketsPerPage: setTicketsPerPageAction,
    setCurrentPage: setCurrentPageAction,
    togglePriorityOrder: togglePriorityOrderAction,
    toggleDateOrder: toggleDateOrderAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);