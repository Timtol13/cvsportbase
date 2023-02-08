import React from 'react';
import {Route, Link, Routes, BrowserRouter} from 'react-router-dom';
import {Registration} from './registration/registration'
import {Login} from './registration/Login'
import {Main} from './Main/Main'
import {Profile} from './Profile/Profile'
import './headerStyle.modul.scss'
import {Advance} from "./registration/advance/Advance";

export const Header = () => {

    return (
        <div>
            <BrowserRouter>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Главная</Link>
                        </li>
                        <li>
                            <Link to="/profile">Мой профиль</Link>
                        </li>
                        <li>
                            <Link to="/registration">Регистрация</Link>
                        </li>
                        <li>
                            <Link to="/login">LogIn</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            </BrowserRouter>
        </div>
    )
}
