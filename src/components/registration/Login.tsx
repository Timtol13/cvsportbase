import React, {useState} from 'react'
import {loginTC} from "../../store/bll/authReducer";
import {useAppDispatch} from "../../hooks/hooks";
import {useFormik} from "formik";
import {useNavigate} from "react-router";
import styles from "./Registration.module.scss";

export const Login = () => {
    const dispatch = useAppDispatch()
    const [role, setRole] = useState('')
    const nav = useNavigate()
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: values => {
            const token = sessionStorage.getItem('tokenData')
            console.log(`${(!token ? '' : JSON.parse(token).access)}`)
            dispatch(loginTC({...values, role})).then(() => {return nav('/home')})
        }
    }
    )
    return (
        <div className={styles.cont}>
            <div className={styles.title}>Вход</div>
            <div className={styles.subTitle}>Введите данные для входа</div>
            <form className={styles.form} onSubmit={formik.handleSubmit}>

                    <input className={styles.input} placeholder={'Введите логин'} {...formik.getFieldProps('username')} />
                    <input className={styles.input} placeholder={'Введите E-mail'} {...formik.getFieldProps('email')} />
                    <input className={styles.input} placeholder={'Введите пароль'} {...formik.getFieldProps('password')} />
                    <select className={styles.select} id={'role'} onChange={e => setRole(e.target.value)}>
                        <option className={styles.option}>Выберите роль</option>
                        <option className={styles.option} value={'Player'}>Игрок</option>
                        <option className={styles.option} value={'Agent'}>Агент</option>
                        <option className={styles.option} value={'Trainer'}>Тренер</option>
                        <option className={styles.option} value={'Parent'}>Родитель</option>
                        <option className={styles.option} value={'Club'}>Клуб</option>
                        <option className={styles.option} value={'Scout'}>Скаут</option>
                    </select>
                    <button className={styles.register} type="submit">Войти</button>
                    <div className={styles.login}>Ещё нет аккаунта? <a href={'/registration'}>Создайте аккаунт</a></div>

            </form>
        </div>
    )
}
