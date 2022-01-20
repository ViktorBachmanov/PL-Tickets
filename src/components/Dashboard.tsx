/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../app/store';

import Box from '@mui/material/Box';

import { setTitle as setTitleAction } from '../features/appbar/appbarSlice';
import { getTicketsForLastDays as getTicketsForLastDaysAction } from '../features/tickets/ticketsSlice';

import BarChart from './BarChart';
import SheetList from './SheetList';
import Loader from './Loader';

import { RequestStatus } from '../constants';


function mapStateToProps(state: RootState) {
  return {
    tickets: state.tickets.list,
    requestStatus: state.tickets.requestStatus,
    lightStatus: state.theme.lightStatus,
  };
}

const mapDispatchToProps = {
  setTitle: setTitleAction,
  getTicketsForLastDays: getTicketsForLastDaysAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>

const period = 14;

function Dashboard(props: PropsFromRedux) {

  useEffect(() => {
    props.setTitle('Dashboard');
    props.getTicketsForLastDays(period);
  }, []);

  if (props.requestStatus === RequestStatus.LOADING) {
    return <Loader />;
  }

  return (
    <Box>
      <SheetList tickets={props.tickets} isForAllUsers={true} />

      <BarChart tickets={props.tickets} lightStatus={props.lightStatus} period={period}/>

      <SheetList tickets={props.tickets} isForAllUsers={false} />
    </Box>
  );
}


export default connector(Dashboard);