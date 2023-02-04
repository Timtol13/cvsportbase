import React from 'react';
import {Route, Link, Routes} from 'react-router-dom';
import {Registration} from './registration/registration'
import {Login} from './registration/Login'
import {Main} from './Main/Main'
import {Profile} from './Profile/Profile'
import './headerStyle.modul.scss'
import {Advance} from "./registration/advance/Advance";

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
                        <li>
                            <Link to="/registration">Регистрация</Link>
                        </li>
                        <li>
                            <Link to="/login">LogIn</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <Routes>
                    <Route path='/' element={<Main />}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/registration' element={<Registration />}/>
                    <Route path='/advance/:role' element={<Advance />}/>
                    <Route path='/profile/:role/:first_name/:second_name/:patronymic' element={<Profile />} />
                </Routes>
            </main>
        </div>
    )
}
