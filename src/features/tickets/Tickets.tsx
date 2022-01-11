/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { css } from '@emotion/react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import TablePagination from '@mui/material/TablePagination';

import { RoutesPathes } from "../../constants";

import { getAllTickets as getAllTicketsAction, 
        resetSavedTicketId as resetSavedTicketIdAction,
        resetStatus as resetStatusAction,
        resetRequestStatus as resetRequestStatusAction,
        resetCurrentTicket as resetCurrentTicketAction,
        getTotalDocs as getTotalDocsAction } from "./ticketsSlice";
import { RootState } from '../../app/store';
import TicketCard from "./TicketCard";
import { loadPage as loadPageAction,
        setTicketsPerPage as setTicketsPerPageAction,
        setCurrentPage as setCurrentPageAction,
        togglePriorityOrder as togglePriorityOrderAction } from "../pagination/paginationSlice";
import { setTitle as setTitleAction } from "../title/titleSlice";
import { Order } from "../pagination/types";
import { ticketsPerPageOptions } from "../pagination/constants";
import { RequestStatus } from "../../constants";
import TicketsTable from "./TicketsTable";
import { TicketCardData } from "./types";
import ViewToggle from "./ViewToggle";



interface Props {
    //getAllTickets: any;
    resetSavedTicketId: any;
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
    //filtersStatus: FiltersStatus;
    currentPage: number;
    ticketsPerPage: number;
    //resetFiltersStatus: any,
    togglePriorityOrder: any;
    priorityOrder: Order;
}

function Tickets(props: Props) {
    const navigate = useNavigate();
    /*
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);*/
    /*
    const paginationData: LoadPageActionPayload = {
        pageNo: page,
        docsPerPage: rowsPerPage,
    };*/

    useEffect(() => {
        props.resetSavedTicketId();
        props.resetStatus();
        props.resetCurrentTicket();
        props.loadPage();
        props.getTotalDocs();
        props.setTitle("Tickets");
        
        return function clean() {
            props.resetRequestStatus();
        }
    }, []);


    
    
/*
    const data = props.ticketsList.map((ticket: any) => 
            
            <TicketCard key={ticket.id} data={ticket} />            
    )*/

    let totalColumns: number;
    const theme = useTheme();

    if(useMediaQuery(theme.breakpoints.down("sm"))) {
        totalColumns = 3;
    }
    else {
        totalColumns = 4;
    }

    totalColumns = 1;


    

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        //setPage(newPage);

        //props.loadPage({ ...paginationData, pageNo: newPage });
        Tickets.isFiltersChanged = true;
        props.setCurrentPage(newPage);
        
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const rowsPerPage = parseInt(event.target.value, 10);
        /*setRowsPerPage(rowsPerPage);
        setPage(0);*/

        //props.loadPage({ pageNo: 0, docsPerPage: rowsPerPage });
        Tickets.isFiltersChanged = true;
        props.setTicketsPerPage(rowsPerPage);
        
    };

    const handleTogglePriorityOrder = () => {
        Tickets.isFiltersChanged = true;
        props.togglePriorityOrder();
    }


    //if(props.filtersStatus === FiltersStatus.CHANGED) {
    if(Tickets.isFiltersChanged) {
        console.log('Tickets.isFiltersChanged: ', Tickets.isFiltersChanged)
        //props.resetFiltersStatus();
        Tickets.isFiltersChanged = false;
        setTimeout(() => { props.loadPage(); }, 0);
        return <h2>Loading...</h2>;
    }

    if(props.requestStatus === RequestStatus.LOADING || !props.totalTickets) {
        return <h2>Loading...</h2>;
    } 

    

    return (
        <Box
            css={css`
                border: 1px solid #DFE0EB;
                border-radius: 8px;
            `}
        >
            <Button
                variant="contained" 
                onClick={() => {navigate(RoutesPathes.CREATE)}}
            >
                Create
            </Button>

            <ViewToggle />

            <TicketsTable 
                tickets={props.ticketsList}
                priorityOrder={props.priorityOrder}
                togglePriorityOrder={handleTogglePriorityOrder}
            />

            <Grid                 
                container 
                columns={totalColumns}
                spacing={1}
            >
                {/*data*/}
            </Grid>

            <TablePagination
                component="div"
                count={props.totalTickets || 100}
                page={props.currentPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={ticketsPerPageOptions}
                rowsPerPage={props.ticketsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

        </Box>

    )
}

Tickets.isFiltersChanged = false;

function mapStateToProps(state: RootState) {
    return { 
        ticketsList: state.pagination.tickets,
        totalTickets: state.tickets.counter,
        requestStatus: state.pagination.status,
        //filtersStatus: state.pagination.filtersStatus,
        currentPage: state.pagination.currentPage,
        ticketsPerPage: state.pagination.ticketsPerPage,
        priorityOrder: state.pagination.priorityOrder,
    };
};

const mapDispatchToProps = {
    //getAllTickets: getAllTicketsAction,
    resetSavedTicketId: resetSavedTicketIdAction,
    resetStatus: resetStatusAction,
    resetRequestStatus: resetRequestStatusAction,
    resetCurrentTicket: resetCurrentTicketAction,
    getTotalDocs: getTotalDocsAction,
    loadPage: loadPageAction,
    setTitle: setTitleAction,
    setTicketsPerPage: setTicketsPerPageAction,
    setCurrentPage: setCurrentPageAction,
    //resetFiltersStatus: resetFiltersStatusAction,
    togglePriorityOrder: togglePriorityOrderAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);