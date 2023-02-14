import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../registration/Login";
import {Registration} from "../registration/registration";
import {Advance} from "../registration/advance/Advance";
import {Profile} from "../Profile/Profile";
import {Header} from "../Header";
import {Modals} from "../Modal/Modals";
import {Home} from "./Home/Home";

export const Main = () => {
    return (
        <div>
            <Header/>
            <main>
                <Routes>
                    <Route path='/' element={<Navigate to={'home'} />}/>
                    <Route path='/home' element={<Home />}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/registration' element={<Registration />}/>
                    <Route path='/advance/:role' element={<Advance />}/>
                    <Route path='/profile/:role/:first_name/:second_name/:patronymic' element={<Profile />} />
                </Routes>
            </main>
            <Modals />
        </div>
    )
}