import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Layout from './components/Layout';
import { RoutesPathes } from './constants';
import Dashboard from './components/Dashboard';
import Tickets from './features/tickets/Tickets';
import TicketForm from './features/tickets/TicketForm';
import { Mode } from './features/tickets/types';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={RoutesPathes.LOGIN} element={<Login />} />
        <Route path={RoutesPathes.ROOT} element={<Layout />}>
          <Route index element={<Navigate to={RoutesPathes.DASHBOARD} replace={true} />} />
          <Route path={RoutesPathes.DASHBOARD} element={<Dashboard />} />
          <Route path={RoutesPathes.TICKETS} element={<Tickets />} />
          <Route path={RoutesPathes.TICKET_ID} element={<TicketForm mode={Mode.READ} />} />
          <Route path={RoutesPathes.CREATE} element={<TicketForm mode={Mode.NEW} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
