import React, {useState} from 'react';
import {registrationApi, getUsers} from "../Api/API";

export const Registration = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div>
            <input placeholder={'Введите логин'} id={'username'} onChange={e => setUsername(e.target.value)} />
            <input placeholder={'Введите e-mail'} id={'email'} onChange={e => setEmail(e.target.value)} />
            <input placeholder={'Введите пароль'} id={'password'} onChange={e => setPassword(e.target.value)} />
            <button onClick={() => {
                const data = {username, email, password}
                registrationApi.postRegistration(data).then()
            }
            }>Зарегистрирвоаться</button>
        </div>
    )
}