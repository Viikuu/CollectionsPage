import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {MainPage} from './pages/MainPage';
import {Register} from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import {Login} from './pages/Login';

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path={"/"} element = {<MainPage />} />
            <Route path={"/Register"} element = {<Register />} />
            <Route path={"/Login"} element = {<Login />} />
            <Route path={"/Admin"} element = {<AdminPanel />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;