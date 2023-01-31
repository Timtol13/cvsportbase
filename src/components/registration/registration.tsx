import React, {useState} from 'react';
import {registrationApi, getUsers} from "../Api/API";
import {Advance} from './advance/Advance'

export const Registration = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [roleA, setRoleA] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div>
            <input placeholder={'Введите логин'} id={'username'} onChange={e => setUsername(e.target.value)} />
            <input placeholder={'Введите e-mail'} id={'email'} onChange={e => setEmail(e.target.value)} />
            <input placeholder={'Введите пароль'} id={'password'} onChange={e => setPassword(e.target.value)} />
            <select id={'role'} onSelect={e => setRoleA(e.currentTarget.value)}>
                <option value={'Player'}>Игрок</option>
                <option value={'Agent'}>Агент</option>
                <option value={'Trainer'}>Тренер</option>
                <option value={'Parent'}>Родитель</option>
                <option value={'Club'}>Клуб</option>
                <option value={'Scout'}>Скаут</option>
            </select>
            <button onClick={() => {
                const data = {username, email, password}
                registrationApi.postRegistration(data).then(() => {return <Advance role={roleA} />})
            }
            }>Зарегистрирвоаться</button>
        </div>
    )
}