import React from 'react';
import {Link} from 'react-router-dom';
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
                        <li>
                            <Link to="/registration">Регистрация</Link>
                        </li>
                        <li>
                            <Link to="/login">LogIn</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}
