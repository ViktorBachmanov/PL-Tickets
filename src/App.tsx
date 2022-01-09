import React from 'react';
import { useSelector } from "react-redux"
import { Routes, Route, Navigate } from "react-router-dom"; 
// import { Counter } from './features/counter/Counter';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { RootState } from "./app/store"
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import { RoutesPathes } from "./constants";
import Dashboard  from './components/Dashboard';
import Tickets  from './features/tickets/Tickets';
import TicketFormWrap  from './features/tickets/TicketFormWrap';
import CreateTicket  from './features/tickets/CreateTicket';
import { Mode } from "./features/tickets/types";





function App() {

  return (
    
    <div className="App">
      
      
      <Routes>
        <Route path={RoutesPathes.LOGIN} element={<Login />} />
        <Route path={RoutesPathes.NOT_FOUND} element={<NotFound />} />
        <Route path={RoutesPathes.ROOT} element={<Layout />}>
          <Route index element={<Navigate to={RoutesPathes.DASHBOARD} replace={true} />} />
          <Route path={RoutesPathes.DASHBOARD} element={<Dashboard />} />
          <Route path={RoutesPathes.TICKETS} element={<Tickets />} />
          <Route path={RoutesPathes.TICKET_ID} element={<TicketFormWrap mode={Mode.READ}/>} />
          <Route path={RoutesPathes.CREATE} element={<CreateTicket />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
