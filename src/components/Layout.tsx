/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from 'react';
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';

import { css } from '@emotion/react'

import KitMui from "./KitMui";
import AppBarTickets  from "./AppBarTickets";



export default function Layout() {
    return (
        <Box css={css`
            display: flex;
        `}
        >
            <KitMui/>

            <Box css={css`
                    overflow: auto;
                    height: 100vh;
                    flex: 1 1 auto;
                `}
            >
                <AppBarTickets/>


                <Outlet/>
            </Box>

        </Box>
    )
}