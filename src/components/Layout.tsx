/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { css } from '@emotion/react';

import { RootState } from '../app/store';

import SideBar from './SideBar';
import AppBarTickets from '../features/appbar/AppBarTickets';
import Login from './Login';
import createMainTheme from '../features/theme/mainTheme';
import { getTotalDocs as getTotalDocsAction } from '../features/tickets/ticketsSlice';

function mapStateToProps(state: RootState) {
  return {
    loginStatus: state.user.loginStatus,
    lightMode: state.theme.lightStatus,  
  };
}

const mapDispatchToProps = {
  getTotalDocs: getTotalDocsAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Layout(props: PropsFromRedux) {
  const { loginStatus, lightMode, getTotalDocs } = props;

  console.log('Layout');

  React.useEffect(() => {
    getTotalDocs();
  }, [getTotalDocs]);

  const mainTheme = React.useMemo(
    () => createMainTheme(lightMode),
    [lightMode]
  );


  if (!loginStatus) {
    return <Login />;
  }


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
          `}
        >
          <AppBarTickets />

          <div style={{ padding: '30px' }}>
            <Outlet />
          </div>

          <Toaster />
        </div>
      </ThemeProvider>
    </Box>
  );
}


export default connector(Layout);