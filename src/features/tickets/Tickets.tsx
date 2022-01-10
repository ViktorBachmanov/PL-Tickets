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

import { getAllTickets as getAllTicketsAction, 
        resetSavedTicketId as resetSavedTicketIdAction,
        resetStatus as resetStatusAction,
        resetRequestStatus as resetRequestStatusAction,
        resetCurrentTicket as resetCurrentTicketAction,
        getTotalDocs as getTotalDocsAction } from "./ticketsSlice";
import { RootState } from '../../app/store';
import TicketCard from "./TicketCard";
import { loadPage as loadPageAction } from "../pagination/paginationSlice";
import { loadPageActionPayload, RequestStatus } from "../pagination/types";
import TicketsTable from "./TicketsTable";



interface Props {
    getAllTickets: any,
    resetSavedTicketId: any,
    resetStatus: any,
    resetRequestStatus: any,
    resetCurrentTicket: any,
    getTotalDocs: any,
    loadPage: any;
    totalTickets: number,
    requestStatus: RequestStatus,
}

function Tickets(props: any) {
    const navigate = useNavigate();

    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    
    const paginationData: loadPageActionPayload = {
        pageNo: page,
        docsPerPage: rowsPerPage,
    };

    useEffect(() => {
        props.resetSavedTicketId();
        props.resetStatus();
        props.resetCurrentTicket();
        props.loadPage(paginationData);
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


    

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);

        props.loadPage({ ...paginationData, pageNo: newPage });
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const rowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(rowsPerPage);
        setPage(0);

        props.loadPage({ pageNo: 0, docsPerPage: rowsPerPage });
    };


    if(props.requestStatus === RequestStatus.LOADING || !props.totalTickets) {
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

            <TicketsTable tickets={props.ticketsList} />

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
                page={page}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[4, 6, 8, 10, 12, 16, 20]}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

        </Box>

    )
}

function mapStateToProps(state: RootState) {
    return { 
        ticketsList: state.pagination.tickets,
        totalTickets: state.tickets.counter,
        requestStatus: state.pagination.status,

    };
};

const mapDispatchToProps = {
    getAllTickets: getAllTicketsAction,
    resetSavedTicketId: resetSavedTicketIdAction,
    resetStatus: resetStatusAction,
    resetRequestStatus: resetRequestStatusAction,
    resetCurrentTicket: resetCurrentTicketAction,
    getTotalDocs: getTotalDocsAction,
    loadPage: loadPageAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);