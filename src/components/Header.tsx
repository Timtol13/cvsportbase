import React from 'react';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom';
import {Registration} from './registration/registration'
import {Login} from './registration/Login'
import {Main} from './Main/Main'
import './headerStyle.modul.scss'

export const Header = () => {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Главная</Link>
                        </li>
                        <li>
                            <Link to="/profile">Мой профиль</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <Routes>
                    <Route path='/' element={<Main />}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/registration' element={<Registration />}/>
                </Routes>
            </main>
        </div>
    )
}