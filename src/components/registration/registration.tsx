import React, {useState} from 'react'
import {useNavigate} from "react-router";
import styles from "./Registration.module.scss"
import {registrationTC} from "../../store/bll/authReducer";
import {useAppDispatch} from "../../hooks/hooks";
import {useFormik} from "formik";

export const Registration = () => {
    const dispatch = useAppDispatch()
    const [role, SetRole] = useState('')
    let error: string | null
    error = null
    const nav = useNavigate()
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },

        onSubmit: values => {
            dispatch(registrationTC({...values, role})).then(() => {
                return nav(`/advance/${role}`)
            }).catch(e => {
                if(e.status === 400){
                    error = 'Такой пользователь уже существует!'
                }
                if(e.status === 401){
                    return nav('/login')
                }
            })
        },
    })

    return (
        <div className={styles.cont}>
            <div className={styles.title}>Регистрация</div>
            <div className={styles.subTitle}>Введите данные для регистрации</div>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <input className={styles.input}
                       placeholder={'Введите логин'} {...formik.getFieldProps('username')} />
                <input className={styles.input}
                       placeholder={'Введите e-mail'} {...formik.getFieldProps('email')} />
                <input className={styles.input} type={'password'}
                       placeholder={'Введите пароль'} {...formik.getFieldProps('password')} />
                <select className={styles.select} id={'role'} onChange={e => {
                    SetRole(e.target.value)
                }}>
                    <option className={styles.option}>Выберите роль</option>
                    <option className={styles.option} value={'Player'}>Игрок</option>
                    <option className={styles.option} value={'Agent'}>Агент</option>
                    <option className={styles.option} value={'Trainer'}>Тренер</option>
                    <option className={styles.option} value={'Parent'}>Родитель</option>
                    <option className={styles.option} value={'Club'}>Клуб</option>
                    <option className={styles.option} value={'Scout'}>Скаут</option>
                </select>
                <div className={styles.checkbox}>
                    <input type="checkbox"/>
                    <div className={styles.assent}>
                        Я согласен на обработку моих персональных данных
                    </div>
                </div>

                <button className={styles.register} type="submit">Зарегистрироваться</button>
                <div className={styles.login}>Уже есть аккаунт? <a href={'/login'}>Войти</a></div>
                {error && <h3>{error}</h3>}
            </form>
        </div>)
}
