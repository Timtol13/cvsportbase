import React, {useState} from 'react'
import {useNavigate} from "react-router";
import './Registration.modul.scss'
import {registrationTC} from "../../store/bll/authReducer";
import {useAppDispatch} from "../../hooks/hooks";

export const Registration = () => {
    const dispatch = useAppDispatch()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [roleA, setRoleA] = useState('')
    let nav = useNavigate()
    const [password, setPassword] = useState('')
    return (
        <div className={'cont'}>
            <div className={'form'}>
                <input placeholder={'Введите логин'} id={'username'} onChange={e => setUsername(e.target.value)} />
                <input placeholder={'Введите e-mail'} id={'email'} onChange={e => setEmail(e.target.value)} />
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
                    const data = {username, email, password}
                    dispatch(registrationTC(data))
                    return nav(`/advance/${roleA}`)
                }
                }>Зарегистрирвоаться</button>
            </div>
        </div>
    )
}
