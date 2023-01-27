import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import {Registration} from './registration/registration'
import {Login} from './registration/Login'

export const Header = () => {
    return (
        <Router>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to="/main">Главная</Link>
                        </li>
                        <li>
                            <Link to="/profile">Мой профиль</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <Switch>
                    <Route path=''>
                        <Login />
                    </Route>
                    <Route path='/registration'>
                        <Registration />
                    </Route>
                </Switch>
            </main>
        </Router>
    )
}