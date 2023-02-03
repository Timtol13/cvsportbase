import React, {useState} from 'react'
import {useNavigate} from "react-router";
import './Registration.modul.scss'
import {advanceTC, registrationTC} from "../../store/bll/authReducer";
import {useAppDispatch} from "../../hooks/hooks";
import {useFormik} from "formik";

export const Registration = () => {
    const dispatch = useAppDispatch()
    const [role, SetRole] = useState('')
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },

        onSubmit: values => {
            dispatch(registrationTC({...values, role}))
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