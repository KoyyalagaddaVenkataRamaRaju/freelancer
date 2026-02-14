import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
import API_URL from '../api'
import { useNavigate } from "react-router-dom";
import socketIoClient from 'socket.io-client';

export const GeneralContext = createContext();

const GeneralContextProvider = ({children}) => {

  const WS = process.env.REACT_APP_SOCKET_URL || API_URL;

  const socket = socketIoClient(WS, { autoConnect: false });


  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');
 
  
  
  
  const login = async () =>{
    const loginInputs = { email, password };
    try {
      const res = await axios.post(`${API_URL}/login`, loginInputs);
      const { token, user } = res.data;
      if (!user) {
        alert('Login failed: invalid response from server');
        return;
      }

      localStorage.setItem('token', token || '');
      localStorage.setItem('userId', user._id);
      localStorage.setItem('usertype', user.usertype);
      localStorage.setItem('username', user.username);
      localStorage.setItem('email', user.email);

      if (token) {
        axios.defaults.headers.common['Authorization'] = token;
        socket.auth = { token };
        socket.connect();
      }

      if (user.usertype === 'freelancer') {
        navigate('/freelancer');
      } else if (user.usertype === 'client') {
        navigate('/client');
      } else if (user.usertype === 'admin') {
        navigate('/admin');
      }
    } catch (err) {
      alert('login failed!!');
      console.log(err?.response?.data || err.message || err);
    }
  }
      
  const inputs = {username, email, usertype, password};

  const register = async () =>{
    try{
        await axios.post(`${API_URL}/register`, inputs)
        .then( async (res)=>{
            localStorage.setItem('userId', res.data._id);
            localStorage.setItem('usertype', res.data.usertype);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('email', res.data.email);

            if(res.data.usertype === 'freelancer'){
              navigate('/freelancer');
          } else if(res.data.usertype === 'client'){
            navigate('/client');
          } else if(res.data.usertype === 'admin'){
              navigate('/admin');
          }
 
        }).catch((err) =>{
            alert("registration failed!!");
            console.log(err);
        });
    }catch(err){
        console.log(err);
    }
  }


  const logout = async () =>{
    
    localStorage.clear();
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        localStorage.removeItem(key);
      }
    }
    axios.defaults.headers.common['Authorization'] = undefined;
    try{ socket.disconnect(); }catch(e){}
    navigate('/');
  }


  return (
    <GeneralContext.Provider value={{socket, login, register, logout, username, setUsername, email, setEmail, password, setPassword, usertype, setUsertype}} >{children}</GeneralContext.Provider>
  )
}

export default GeneralContextProvider