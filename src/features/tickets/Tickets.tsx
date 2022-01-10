import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import TablePagination from '@mui/material/TablePagination';

import { RoutesPathes } from "../../constants";
import { RequestStatus } from "./types";

import { getAllTickets as getAllTicketsAction, 
        resetSavedTicketId as resetSavedTicketIdAction,
        resetStatus as resetStatusAction,
        resetRequestStatus as resetRequestStatusAction,
        resetCurrentTicket as resetCurrentTicketAction,
        getTotalDocs as getTotalDocsAction } from "./ticketsSlice";
import { RootState } from '../../app/store';
import TicketCard from "./TicketCard";

interface Props {
    getAllTickets: any,
    resetSavedTicketId: any,
    resetStatus: any,
    resetRequestStatus: any,
    resetCurrentTicket: any,
    getTotalDocs: any,
    totalTickets: number,
    requestStatus: RequestStatus,
}

function Tickets(props: any) {
    const navigate = useNavigate();

    useEffect(() => {
        props.resetSavedTicketId();
        props.resetStatus();
        props.resetCurrentTicket();
        props.getAllTickets();
        props.getTotalDocs();
        
        return function clean() {
            props.resetRequestStatus();
        }
    }, []);

    
    

    const data = props.ticketsList.map((ticket: any) => 
            
            <TicketCard key={ticket.id} data={ticket} />            
    )

    let totalColumns: number;
    const theme = useTheme();

    if(useMediaQuery(theme.breakpoints.down("sm"))) {
        totalColumns = 3;
    }
    else {
        totalColumns = 4;
    }

    totalColumns = 1;


    function handleChangePage() {
        console.log('handleChangePage');
    }

    function handleChangeRowsPerPage() {
        console.log('handleChangeRowsPerPage');
    }

    if(props.requestStatus !== RequestStatus.DONE || !props.totalTickets) {
        return <h2>Loading...</h2>;
    } 
    

    return (
        <Box>
            <Button
                variant="contained" 
                onClick={() => {navigate(RoutesPathes.CREATE)}}
            >
                Create
            </Button>

            <Grid                 
                container 
                columns={totalColumns}
                spacing={1}
            >
                {data}
            </Grid>

            <TablePagination
                component="div"
                count={props.totalTickets || 100}
                page={0}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[4, 6, 8, 10, 12, 16, 20]}
                rowsPerPage={8}
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
    };
};

const mapDispatchToProps = {
    getAllTickets: getAllTicketsAction,
    resetSavedTicketId: resetSavedTicketIdAction,
    resetStatus: resetStatusAction,
    resetRequestStatus: resetRequestStatusAction,
    resetCurrentTicket: resetCurrentTicketAction,
    getTotalDocs: getTotalDocsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);