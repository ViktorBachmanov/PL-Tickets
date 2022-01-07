import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { RoutesPathes } from "../../constants";
import { getAllTickets as getAllTicketsAction, TicketCardData } from "./ticketsSlice";
import { RootState } from '../../app/store';
import TicketCard from "./TicketCard";



function Tickets(props: any) {
    const navigate = useNavigate();

    useEffect(() => {
        props.getAllTickets();
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

        </Box>

    )
}

function mapStateToProps(state: RootState) {
    return { 
        ticketsList: state.tickets.list,
    };
};

const mapDispatchToProps = {
    getAllTickets: getAllTicketsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);