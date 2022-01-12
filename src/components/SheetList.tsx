/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { css } from '@emotion/react'

import Sheet from "./Sheet";

import { TicketCardData, Priority } from "../features/tickets/types";



interface Props {
    tickets: Array<TicketCardData>;
    isForAllUsers: boolean;
}


export default function SheetList(props: Props) {
    const { tickets, isForAllUsers } = props;

    const userId = useSelector((state: RootState) => state.user.id);

    let low = 0;
    let normal = 0;
    let high = 0;
    let total = 0;
    

    for(let i = 0; i < tickets.length; i++) {

        if(!isForAllUsers && tickets[i].authorId !== userId) {
            continue;
        }

        if(tickets[i].isCompleted) {
            total++;
            continue;
        }

        total++;
        

        switch(tickets[i].priority) {
            case Priority.LOW:
                low++;
                break;
            case Priority.NORMAL:
                normal++;
                break;
            case Priority.HIGH:
                high++;
                break;
        }


        
    }

    const totalUncompleted = low + normal + high;

    let titlePrefix = "";
    if(isForAllUsers) {
        titlePrefix = "Total ";
    }

    return (
        <Box
            css={css`
                display: flex;
            `}
        >
            <Sheet title={titlePrefix + "Low"} value={low}/>
            <Sheet title={titlePrefix + "Normal"} value={normal}/>
            <Sheet title={titlePrefix + "High"} value={high}/>
            <Sheet title={titlePrefix + "Uncompleted"} value={totalUncompleted} total={total} />
        </Box>
    )
}