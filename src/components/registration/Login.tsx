import React, {useState} from 'react'
import {loginTC} from "../../store/bll/authReducer";
import './Registration.module.scss'
import {useAppDispatch} from "../../hooks/hooks";
import {useFormik} from "formik";
import {useNavigate} from "react-router";

export const Login = () => {
    const dispatch = useAppDispatch()
    const [role, setRole] = useState('')
    const nav = useNavigate()
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        onSubmit: values => {
            dispatch(loginTC({...values, role})).then(() => {return nav('/home')})
        }
    }
    )
    return (
        <div className={'cont'}>
            <div className={'form'}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={'inputs'}>
                        <input placeholder={'Введите логин'} {...formik.getFieldProps('username')} />
                        <input placeholder={'Введите E-mail'} {...formik.getFieldProps('email')} />
                        <input placeholder={'Введите пароль'} {...formik.getFieldProps('password')} />
                        <select id={'role'} onChange={e => setRole(e.target.value)}>
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
