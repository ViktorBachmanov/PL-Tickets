/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from 'react';
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';

import { css } from '@emotion/react'

import { useSelector } from 'react-redux';
import { RootState } from '../app/store';


import SideBar from "./SideBar";
import AppBarTickets  from "./AppBarTickets";
import Login from "./Login";




export default function Layout() {
    const loginStatus = useSelector((state: RootState) => state.user.loginStatus);
    if(!loginStatus) {
        return <Login />
    }

    return (
        <Box css={css`
            display: flex;
        `}
        >
            
            <SideBar/>

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