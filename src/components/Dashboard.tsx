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
import SheetList from "./SheetList";
import { LightStatus } from "../features/theme/types";


interface Props {
    setTitle: any;
    getAllTickets: any;
    tickets: Array<TicketCardData>;
    lightStatus: LightStatus;
}


function Dashboard(props: Props) {

    //console.log('Dashboard');


    useEffect(() => {
        props.setTitle("Dashboard");
        props.getAllTickets();
    }, []);

    return (
        <Box>
            <SheetList tickets={props.tickets} isForAllUsers={true} />

            <BarChart tickets={props.tickets} lightStatus={props.lightStatus}/>

            <SheetList tickets={props.tickets} isForAllUsers={false} />
        </Box>
    )
}


function mapStateToProps(state: RootState) {
    return { 
        tickets: state.tickets.list,
        lightStatus: state.theme.lightStatus,    
    };
};


const mapDispatchToProps = {
    setTitle: setTitleAction,
    getAllTickets: getAllTicketsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
