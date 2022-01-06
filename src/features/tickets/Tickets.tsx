import React from "react";
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { RoutesPathes } from "../../constants";
import { getAllTickets as getAllTicketsAction } from "./ticketsSlice";



function Tickets(props: any) {
    const navigate = useNavigate();

    props.getAllTickets();

    return (
        <Box>
            <Button
                variant="contained" 
                onClick={() => {navigate(RoutesPathes.CREATE)}}
            >
                Create
            </Button>

        </Box>

    )
}

const mapDispatchToProps = {
    getAllTickets: getAllTicketsAction,
};

export default connect(null, mapDispatchToProps)(Tickets);