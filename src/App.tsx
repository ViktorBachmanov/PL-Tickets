import React from 'react';
import { useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom"; 
// import { Counter } from './features/counter/Counter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { RootState } from "./app/store"
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import { RoutesPathes } from "./constants";
import Dashboard  from './components/Dashboard';
import Tickets  from './features/tickets/Tickets';
import TicketForm  from './features/tickets/TicketForm';
import { Mode } from "./features/tickets/types";


const bgDark = "#102027";
const bgLight = "#F7F8FC";


function App() {

  const themeMode: "light" | "dark" | undefined = useSelector((state: RootState) => state.theme.lightStatus);

  const ticketsTheme = createTheme({
    palette: {
      mode: themeMode,      
      background: {
        default: themeMode === "light" ? bgLight : bgDark,
        paper: themeMode === "light" ? bgLight : bgDark,
      }
    },
    typography: {
      button: {
        textTransform: "none"
      }
    }
  });

  return (
    <ThemeProvider theme={ticketsTheme}>
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
    </ThemeProvider>
  );
}

export default App;
