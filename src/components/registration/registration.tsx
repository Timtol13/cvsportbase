import React, {useState} from 'react'
import {useNavigate} from "react-router";
import './Registration.modul.scss'
import {registrationTC} from "../../store/bll/authReducer";
import {useAppDispatch} from "../../hooks/hooks";
import {useFormik} from "formik";

export const Registration = () => {
    const api = 'http://127.0.0.1:8000/api/'
    const dispatch = useAppDispatch()
    const [role, SetRole] = useState('')
    const nav = useNavigate()
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },

        onSubmit: values => {
            return fetch(`${api}registration`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            }).then(((res) => {
                if (res.status === 200) {
                    const tokenData = res.json();
                    sessionStorage.setItem('tokenData', JSON.stringify(JSON.stringify(tokenData)));
                    return Promise.resolve()
                }
                return Promise.reject();
                }
                )
            )
            // dispatch(registrationTC({...values, role}))
            // return nav(`/advance/${role}`)
        },
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={'cont'}>
                <div className={'form'}>
                    <div className={'inputs'}>
                        <input placeholder={'Введите логин'} {...formik.getFieldProps('username')} />
                        <input placeholder={'Введите e-mail'} {...formik.getFieldProps('email')} />
                        <input type={'password'} placeholder={'Введите пароль'} {...formik.getFieldProps('password')} />
                        <select id={'role'} onChange={e => {SetRole(e.target.value)}}>
                            <option>Выберите роль</option>
                            <option value={'Player'}>Игрок</option>
                            <option value={'Agent'}>Агент</option>
                            <option value={'Trainer'}>Тренер</option>
                            <option value={'Parent'}>Родитель</option>
                            <option value={'Club'}>Клуб</option>
                            <option value={'Scout'}>Скаут</option>
                        </select>
                        <button type="submit">Зарегистрирвоаться</button>
                        <h5>Уже есть аккаунт? <a href={'/login'}>Войдите</a></h5>
                    </div>
                </div>
            </div>
        </form>
    )
}
