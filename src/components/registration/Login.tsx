import React, {useState} from 'react'
import {registrationTC} from "../../store/bll/authReducer";
import './Registration.modul.scss'
import {useAppDispatch} from "../../hooks/hooks";
import {useNavigate} from "react-router";
import {useFormik} from "formik";

export const Login = () => {
    const api = 'http://127.0.0.1:8000/api/'
    //const dispatch = useAppDispatch()
    const [roleA, setRoleA] = useState('')
    const [user, setUser] = useState<string>()
    let nav = useNavigate()
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: values => {
            return fetch(`${api}token/`, {
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(values)
            })
                .then((res) => {
                    if (res.status === 200) {
                        const tokenData = res.json();
                        sessionStorage.setItem('tokenData', JSON.stringify(JSON.stringify(tokenData)));
                        return Promise.resolve()
                    }
                    return Promise.reject();})
                .then(() => {return nav('/home')})
        }
    }
    )
    return (
        <div className={'cont'}>
            <div className={'form'}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={'inputs'}>
                        <input placeholder={'Введите логин'} {...formik.getFieldProps('username')} />
                        <input placeholder={'Введите пароль'} {...formik.getFieldProps('password')} />
                        <select id={'role'} onChange={e => setRoleA(e.target.value)}>
                            <option>Выберите роль</option>
                            <option value={'Player'}>Игрок</option>
                            <option value={'Agent'}>Агент</option>
                            <option value={'Trainer'}>Тренер</option>
                            <option value={'Parent'}>Родитель</option>
                            <option value={'Club'}>Клуб</option>
                            <option value={'Scout'}>Скаут</option>
                        </select>
                        <button type="submit">Зарегистрирвоаться</button>
                        <h5>Ещё нет аккаунта? <a href={'/registration'}>Создайте аккаунт</a></h5>
                    </div>
                </form>
            </div>
        </div>
    )
}