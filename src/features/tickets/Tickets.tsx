import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { RoutesPathes } from "../../constants";
import { getAllTickets as getAllTicketsAction } from "./ticketsSlice";
import { RootState } from '../../app/store';



function Tickets(props: any) {
    const navigate = useNavigate();

    useEffect(() => {
        props.getAllTickets();
    }, []);

    const data = props.ticketsList.map((ticket: any) => {
        return (
            <div key={ticket.title}>
                <div>{ticket.title}</div>
                <div>{ticket.priority}</div>
                <div>{ticket.authorName}</div>
                <div>{ticket.createdAt}</div>
            </div>
        )
    })

    return (
        <Box>
            <Button
                variant="contained" 
                onClick={() => {navigate(RoutesPathes.CREATE)}}
            >
                Create
            </Button>

                {data}

        </Box>

    )
}

function mapStateToProps(state: RootState) {
    return { 
        requestStatus: state.tickets.status,
        ticketsList: state.tickets.list,
    };
};

const mapDispatchToProps = {
    getAllTickets: getAllTicketsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);