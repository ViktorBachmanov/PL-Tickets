/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from 'react';
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


import { css } from '@emotion/react'


import { useSelector } from 'react-redux';
import { RootState } from '../app/store';


import SideBar from "./SideBar";
import AppBarTickets  from "./AppBarTickets";
import Login from "./Login";
import createMainTheme from "../mainTheme";



export default function Layout() {

    const lightMode: "light" | "dark" | undefined = useSelector((state: RootState) => state.theme.lightStatus);

    const loginStatus = useSelector((state: RootState) => state.user.loginStatus);
    if(!loginStatus) {
        return <Login />
    }  

    const mainTheme = createMainTheme(lightMode);

    return (
        <Box css={css`
            display: flex;
        `}
        >
            
            <SideBar/>

            <ThemeProvider theme={mainTheme}>
            <CssBaseline/>
            <Box css={css`
                    overflow: auto;
                    height: 100vh;
                    flex: 1 1 auto;
                    padding: 30px;
                    `}
                    >
                <AppBarTickets/>


                <Outlet/>
            </Box>
            </ThemeProvider>

        </Box>
    )
}