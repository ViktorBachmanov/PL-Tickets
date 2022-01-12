/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useEffect } from "react";
import { connect } from "react-redux";

import { RootState } from '../app/store';

import Box from '@mui/material/Box';
import { css } from '@emotion/react';

import { setTitle as setTitleAction } from "../features/title/titleSlice";
import { getAllTickets as getAllTicketsAction } from "../features/tickets/ticketsSlice";
import { TicketCardData } from "../features/tickets/types";

import BarChart from "./BarChart";


interface Props {
    setTitle: any;
    getAllTickets: any;
    tickets: Array<TicketCardData>;
}


function Dashboard(props: Props) {

    //console.log('Dashboard');


    useEffect(() => {
        props.setTitle("Dashboard");
        props.getAllTickets();
    }, []);

    return (
        <Box>
            <BarChart tickets={props.tickets}/>
        </Box>
    )
}


function mapStateToProps(state: RootState) {
    return { 
        tickets: state.tickets.list,      
    };
};


const mapDispatchToProps = {
    setTitle: setTitleAction,
    getAllTickets: getAllTicketsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
