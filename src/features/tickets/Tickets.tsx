/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { css } from '@emotion/react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';

import { RoutesPathes } from '../../constants';

import {
  getTotalDocs as getTotalDocsAction,
  loadPage as loadPageAction,
  setTicketsPerPage as setTicketsPerPageAction,
  setCurrentPage as setCurrentPageAction,
  togglePriorityOrder as togglePriorityOrderAction,
  toggleDateOrder as toggleDateOrderAction,
  setCurrentTicketById as setCurrentTicketByIdAction,
} from './ticketsSlice';
import { setView as setViewAction } from '../theme/themeSlice';
import { BgColors, LightStatus } from '../theme/types';
import ViewToggle from '../theme/ViewToggle';
import { RootState } from '../../app/store';
import { setTitle as setTitleAction, 
        setSearchDisplay as setSearchDisplayAction,
       } from '../appbar/appbarSlice';
import { ticketsPerPageOptions } from './constants';
import { RequestStatus, viewRep } from '../../constants';
import TicketsTable from './TicketsTable';
import TicketsModule from './TicketsModule';
import Loader from '../../components/Loader';
import { TicketCardData } from "./types";


function mapStateToProps(state: RootState) {
  return {
    ticketsList: state.tickets.list,
    totalTickets: state.tickets.counter,
    requestStatus: state.tickets.requestStatus,
    currentPage: state.tickets.currentPage,
    ticketsPerPage: state.tickets.ticketsPerPage,
    priorityOrder: state.tickets.priorityOrder,
    dateOrder: state.tickets.dateOrder,
    view: state.theme.view,
    lightMode: state.theme.lightStatus,
    searchText: state.appbar.searchText,
  };
}

const mapDispatchToProps = {
  getTotalDocs: getTotalDocsAction,
  loadPage: loadPageAction,
  setTitle: setTitleAction,
  setTicketsPerPage: setTicketsPerPageAction,
  setCurrentPage: setCurrentPageAction,
  togglePriorityOrder: togglePriorityOrderAction,
  toggleDateOrder: toggleDateOrderAction,
  setCurrentTicketById: setCurrentTicketByIdAction,
  setView: setViewAction,
  setSearchDisplay: setSearchDisplayAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>


function Tickets(props: PropsFromRedux) {
  const { ticketsList, currentPage, ticketsPerPage, priorityOrder, 
        dateOrder, totalTickets, view, setView, lightMode, searchText } = props;

  const [visibleTickets, setVisibleTickets] = React.useState(ticketsList);
  

  const navigate = useNavigate();

  useEffect(() => {
    props.getTotalDocs();
    props.setTitle('Tickets');
    props.setSearchDisplay(true);

    return function clean() {
      props.setSearchDisplay(false);
    };
  }, []);

  useEffect(() => {
    props.loadPage().unwrap()
          .then(tickets => {
            setVisibleTickets(filterTickets(tickets, searchText));
          });
  }, [currentPage, ticketsPerPage, dateOrder, priorityOrder, totalTickets]);


  useEffect(() => {
    setVisibleTickets(filterTickets(ticketsList, searchText));
  }, [searchText]);


  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    props.setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const rowsPerPage = parseInt(event.target.value, 10);

    props.setTicketsPerPage(rowsPerPage);
  };

  if (props.requestStatus === RequestStatus.LOADING || !props.totalTickets) {
    return <Loader />;
  }

  let viewComp;

  if (view === viewRep.list) {
    viewComp = (
      <TicketsTable
        tickets={visibleTickets}
        priorityOrder={props.priorityOrder}
        dateOrder={props.dateOrder}
        togglePriorityOrder={props.togglePriorityOrder}
        toggleDateOrder={props.toggleDateOrder}
        setCurrentTicketById={props.setCurrentTicketById}
      />
    );
  } else {
    viewComp = <TicketsModule tickets={visibleTickets} setCurrentTicketById={props.setCurrentTicketById} />;
  }

  const background = lightMode === LightStatus.LIGHT ? '#FFF' : BgColors.DARK;

  return (
    <Box
      css={css`
        border: 1px solid #dfe0eb;
        border-radius: 8px;
        background: ${background};
      `}
    >
      <Box
        css={css`
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-bottom: 1rem;
        `}
      >
        <Typography
          variant="h6"
          component="div"
          css={css`
            margin-right: auto;
            margin-left: 1rem;
          `}
        >
          All tickets
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            navigate(RoutesPathes.CREATE);
          }}
        >
          Create
        </Button>

        <ViewToggle view={view} setView={setView} />
      </Box>

      {viewComp}

      <TablePagination
        component="div"
        count={props.totalTickets}
        page={props.currentPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={ticketsPerPageOptions}
        rowsPerPage={props.ticketsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}


export default connector(Tickets);


// helper functions

function filterTickets(tickets: Array<TicketCardData>, text: string): Array<TicketCardData> {
  return tickets.filter(ticket => {
    return ticket.title.match(RegExp(text, "i"));
  });
}