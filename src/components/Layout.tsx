/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';

import { css } from '@emotion/react';

import { RootState } from '../app/store';

import SideBar from './SideBar';
import AppBarTickets from '../features/appbar/AppBarTickets';
import Login from './Login';
import { setLightStatus as setLightStatusAction } from '../features/theme/themeSlice';
import createMainTheme from '../features/theme/mainTheme';
import { LightStatus } from '../features/theme/types';
import { getTotalDocs as getTotalDocsAction } from '../features/tickets/ticketsSlice';

function mapStateToProps(state: RootState) {
  return {
    loginStatus: state.user.loginStatus,
    lightMode: state.theme.lightStatus,  
  };
}

const mapDispatchToProps = {
  setLightStatus: setLightStatusAction,
  getTotalDocs: getTotalDocsAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Layout(props: PropsFromRedux) {
  const { loginStatus, lightMode, setLightStatus, getTotalDocs } = props;

  //console.log('Layout');

  const isPrefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  //console.log('isPrefersDarkMode: ', isPrefersDarkMode);
  const systemLightMode = isPrefersDarkMode ? LightStatus.DARK : LightStatus.LIGHT;
  React.useEffect(() => {
    setLightStatus(systemLightMode);
    getTotalDocs();
  }, [systemLightMode, setLightStatus, getTotalDocs]); 

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