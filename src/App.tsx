import React from 'react';
import './App.css';
import {fetchWithAuth} from "./api/api"
import {Main} from "./components/Main/Main";

export const App = () => {
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    setTimeout(()=>{return fetchWithAuth('api/refreshToken', options)}, 86400000)
  return (
    <div>
        <Main />
    </div>
  );
}

