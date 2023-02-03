import React, {useState} from 'react'
import {registrationTC} from "../../store/bll/authReducer";
import './Registration.modul.scss'
import {useAppDispatch} from "../../hooks/hooks";
import {useNavigate} from "react-router";

export const Login = () => {
    const dispatch = useAppDispatch()
    const [username, setUsername] = useState('')
    const [roleA, setRoleA] = useState('')
    let nav = useNavigate()
    const [password, setPassword] = useState('')
    return (
        <div className={'cont'}>
            <div className={'form'}>
                <div className={'inputs'}>
                    <input placeholder={'Введите логин'} id={'username'} onChange={e => setUsername(e.target.value)} />
                    <input placeholder={'Введите пароль'} id={'password'} onChange={e => setPassword(e.target.value)} />
                    <select id={'role'} onChange={e => setRoleA(e.target.value)}>
                        <option>Выберите роль</option>
                        <option value={'Player'}>Игрок</option>
                        <option value={'Agent'}>Агент</option>
                        <option value={'Trainer'}>Тренер</option>
                        <option value={'Parent'}>Родитель</option>
                        <option value={'Club'}>Клуб</option>
                        <option value={'Scout'}>Скаут</option>
                    </select>
                    <button onClick={() => {
                        return nav(`/`)
                    }
                    }>Зарегистрирвоаться</button>
                    <h5>Ещё нет аккаунта? <a href={'/registration'}>Создайте аккаунт</a></h5>
                </div>
            </div>
        </div>
    )
}