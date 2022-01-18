/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { css } from '@emotion/react';

import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

import SideBar from './SideBar';
import AppBarTickets from '../features/appbar/AppBarTickets';
import Login from './Login';
import createMainTheme from '../features/theme/mainTheme';
import { LightStatus } from '../features/theme/types';

export default function Layout() {
  const lightMode: LightStatus = useSelector((state: RootState) => state.theme.lightStatus);

  const loginStatus = useSelector((state: RootState) => state.user.loginStatus);
  if (!loginStatus) {
    return <Login />;
  }

  const mainTheme = createMainTheme(lightMode);

  return (
    <Box
      css={css`
        display: flex;
        min-width: 900px;
      `}
    >
      <SideBar />

      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <div
          css={css`
            overflow: auto;
            height: 100vh;
            flex: 1 1 auto;
            padding: 30px;
          `}
        >
          <AppBarTickets />

          <Outlet />

          <Toaster />
        </div>
      </ThemeProvider>
    </Box>
  );
}
