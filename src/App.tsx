import React from 'react';
import { Routes, Route } from "react-router-dom"; 
// import { Counter } from './features/counter/Counter';
import './App.css';
import Login from "./components/login";
import NotFound from "./components/notFound";
import KitMui from "./components/kitMui";
import { RoutesPathes } from "./constants";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={RoutesPathes.LOGIN} element={<Login />} />
        <Route path={RoutesPathes.NOT_FOUND} element={<NotFound />} />
        <Route path={RoutesPathes.DASHBOARD} element={<KitMui />} />
      </Routes>
    </div>
  );
}

export default App;
