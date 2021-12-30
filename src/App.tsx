import React from 'react';
import { Routes, Route } from "react-router-dom"; 
// import { Counter } from './features/counter/Counter';
import './App.css';
import Login from "./components/login";
import { RoutesPathes } from "./constants";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={RoutesPathes.LOGIN} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
