import React from 'react';
import './App.css';
import Login from './Auth/Login';
// import {  Routes, Route } from "react-router-dom"
import RegisterPage from './Auth/RegisterPage';
import {  Routes, Route } from 'react-router-dom'

import Dashboard from './Home/Dashboard';
// import IsAuthenticated from './Components/IsAuthenticated/IsAuthenticated';

function App() {


  const [token, setToken] = React.useState('')

  return (
    <div className="App">
     


      <Routes>

        {/* <Route path="/dashboard" element={<IsAuthenticated><Dashboard /></IsAuthenticated>} /> */}
        <Route path='/' element={ localStorage.getItem("access_token") ? <Dashboard /> :
            <Login setToken={setToken} />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/login" element={<Login setToken={setToken} />} />
      </Routes>

    
    </div>
  );
}

export default App;
