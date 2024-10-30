import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calendar from './Calendar';
import Event from './Event';
import Search from './Search';
import Login from './Login';
import Register from './Register';
import { useState, createContext, useContext } from "react";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import sliceSlice from './store/allSlice';
import EventRout from './EventRout';
import UserContext from './UserContext';
import './App.css';

//https://github.com/mui/material-ui/blob/v5.15.5/docs/data/material/getting-started/templates/sign-in/SignIn.js
const myStore = configureStore({
  reducer: {sliceSlice} 
 })
const App = () => {
  const [user, setUser] = useState({});

  return (
    <Provider store={myStore}>
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/event" element={<EventRout/>} />
          <Route path="/search" element={<Search />} />
        </ Routes>
      </BrowserRouter>
    </UserContext.Provider>
        </Provider>

  );
}
export default App;
