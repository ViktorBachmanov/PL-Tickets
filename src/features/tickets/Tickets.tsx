/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import { OrderByDirection } from "firebase/firestore";

import { css } from '@emotion/react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';

import { RoutesPathes } from "../../constants";

import { /*resetStatus as resetStatusAction,*/
        resetRequestStatus as resetRequestStatusAction,        
        getTotalDocs as getTotalDocsAction,
        loadPage as loadPageAction,
        setTicketsPerPage as setTicketsPerPageAction,
        setCurrentPage as setCurrentPageAction,
        togglePriorityOrder as togglePriorityOrderAction,
        toggleDateOrder as toggleDateOrderAction,
        setCurrentTicketById as setCurrentTicketByIdAction, } from "./ticketsSlice";
import { setView as setViewAction } from "../theme/themeSlice";
import { RootState } from '../../app/store';
import { setTitle as setTitleAction,
        setSearchDisplay as setSearchDisplayAction } from "../appbar/appbarSlice";
import { ticketsPerPageOptions } from "./constants";
import { RequestStatus, viewRep } from "../../constants";
import TicketsTable from "./TicketsTable";
import { TicketCardData } from "./types";
import ViewToggle from "../theme/ViewToggle";
import TicketsModule from "./TicketsModule";
import Loader from "../../components/Loader";


interface Props {    
    resetRequestStatus: any;
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
    priorityOrder: OrderByDirection;
    toggleDateOrder: any;
    dateOrder: OrderByDirection;
    //status: Status;
    setCurrentTicketById: any;
    view: string;
    setView: any;
    setSearchDisplay: any;
}

function Tickets(props: Props) {
    const { currentPage, ticketsPerPage, priorityOrder, dateOrder, totalTickets, view, setView } = props;
    const navigate = useNavigate();
    

    useEffect(() => {
        //props.resetStatus();
        //props.resetCurrentTicket();
        //props.loadPage();
        props.getTotalDocs();
        props.setTitle("Tickets");
        props.setSearchDisplay(true);
        
        return function clean() {
            props.setSearchDisplay(false);
        }
    }, []);


    useEffect(() => {  
        props.loadPage();       
    }, [ currentPage, ticketsPerPage, dateOrder, priorityOrder, totalTickets ]);


    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        
        props.setCurrentPage(newPage);
        
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const rowsPerPage = parseInt(event.target.value, 10);
        
        props.setTicketsPerPage(rowsPerPage);
        
    };

    const handleTogglePriorityOrder = () => {
        props.togglePriorityOrder();
    }

    const handleToggleDateOrder = () => {
        props.toggleDateOrder();
    }

   
    if(props.requestStatus === RequestStatus.LOADING || !props.totalTickets) {
        return <Loader />;
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
                setCurrentTicketById={props.setCurrentTicketById}
            />
        )
    }
    else {
        viewComp = (
            <TicketsModule
                tickets={props.ticketsList}
                setCurrentTicketById={props.setCurrentTicketById}
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

            

        </Box>

    )
}


function mapStateToProps(state: RootState) {
    return { 
        ticketsList: state.tickets.list,
        totalTickets: state.tickets.counter,
        requestStatus: state.tickets.requestStatus,
        currentPage: state.tickets.currentPage,
        ticketsPerPage: state.tickets.ticketsPerPage,
        priorityOrder: state.tickets.priorityOrder,
        dateOrder: state.tickets.dateOrder,
        view: state.theme.view,
    };
};

const mapDispatchToProps = {
   
    //resetStatus: resetStatusAction,
    resetRequestStatus: resetRequestStatusAction,
    //resetCurrentTicket: resetCurrentTicketAction,
    getTotalDocs: getTotalDocsAction,
    loadPage: loadPageAction,
    setTitle: setTitleAction,
    setTicketsPerPage: setTicketsPerPageAction,
    setCurrentPage: setCurrentPageAction,
    togglePriorityOrder: togglePriorityOrderAction,
    toggleDateOrder: toggleDateOrderAction,
    setCurrentTicketById: setCurrentTicketByIdAction,
    setView: setViewAction,
    setSearchDisplay: setSearchDisplayAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);