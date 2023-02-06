import React, {useState} from 'react'
import {getAPI} from '../../api/api'
import {VideoType} from '../../api/RequestType'
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../registration/Login";
import {Registration} from "../registration/registration";
import {Advance} from "../registration/advance/Advance";
import {Profile} from "../Profile/Profile";
import {Header} from "../Header";
import {MainModal} from "../Modal/MainModal/MainModal";
import {Modals} from "../Modal/Modals";

export const Main = () => {
    const [videos, setVideos] = useState<VideoType>()
    getAPI.getVideos().then(e => {
        setVideos(e.data)
    })
    return (
        <div>
            <Header/>
            <main>
                <Routes>
                    <Route path='/' element={<Navigate to={'login'} />}/>
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
