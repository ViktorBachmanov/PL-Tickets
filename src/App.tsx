import React from 'react';
import { Routes, Route } from "react-router-dom"; 
// import { Counter } from './features/counter/Counter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import { RoutesPathes } from "./constants";
import Dashboard  from './components/Dashboard';
import Tickets  from './features/tickets/Tickets';
import TicketForm  from './features/tickets/TicketForm';
import { Mode } from "./features/tickets/types";



const mainTheme = createTheme({
  palette: {
    primary: {
        main: "#A4A6B3"
    },
    background: {
        default: "#363740"
    }
  },
});



function App() {
  return (
    
    <div className="App">
      <CssBaseline/>
      
      <Routes>
        <Route path={RoutesPathes.LOGIN} element={<Login />} />
        <Route path={RoutesPathes.NOT_FOUND} element={<NotFound />} />
        <Route path={RoutesPathes.ROOT} element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path={RoutesPathes.DASHBOARD} element={<Dashboard />} />
          <Route path={RoutesPathes.TICKETS} element={<Tickets />} />
          <Route path={RoutesPathes.CREATE} element={<TicketForm mode={Mode.NEW} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
