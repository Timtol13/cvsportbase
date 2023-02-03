import React, {useState} from 'react'
import {useNavigate} from "react-router";
import './Registration.modul.scss'
import {advanceTC, registrationTC} from "../../store/bll/authReducer";
import {useAppDispatch} from "../../hooks/hooks";
import {useFormik} from "formik";

export const Registration = () => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            login: '',
            email: '',
            password: ''
        },

        onSubmit: () => {
            dispatch(registrationTC({email: "", password: "", username: ""}))
            return nav(`/advance/${roleA}`)
        },
    })
    let nav = useNavigate()
    let roleA = ''
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={'cont'}>
                <div className={'form'}>
                    <div className={'inputs'}>
                        <input placeholder={'Введите логин'} {...formik.getFieldProps('login')} />
                        <input placeholder={'Введите e-mail'} {...formik.getFieldProps('email')} />
                        <input type={'password'} placeholder={'Введите пароль'} {...formik.getFieldProps('password')} />
                        <select id={'role'} onChange={e => {roleA=e.target.value}}>
                            <option>Выберите роль</option>
                            <option>Игрок</option>
                            <option>Агент</option>
                            <option>Тренер</option>
                            <option>Родитель</option>
                            <option>Клуб</option>
                            <option>Скаут</option>
                        </select>
                        <button type="submit">Зарегистрирвоаться</button>
                        <h5>Уже есть аккаунт? <a href={'/login'}>Войдите</a></h5>
                    </div>
                </div>
            </div>
        </form>
    )
}