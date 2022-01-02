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
import Tickets  from './components/Tickets';
import CreateTicket  from './components/CreateTicket';


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
        <Route path={RoutesPathes.DASHBOARD} element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path={RoutesPathes.TICKETS} element={<Tickets />} />
          <Route path={RoutesPathes.CREATE} element={<CreateTicket />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
