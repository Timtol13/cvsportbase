import styles from './Forms.module.scss'
import {useAppDispatch} from "../../../../hooks/hooks";
import React from "react";
import {useFormik} from "formik";
import {advanceTC} from "../../../../store/bll/authReducer";
import {useNavigate} from "react-router";

export const Parent = () => {
    const user_storage = localStorage.getItem('app-state')
    const user = JSON.parse(user_storage? user_storage : '').auth.me.username
    const dispatch = useAppDispatch()
    const nav = useNavigate()
    const formik = useFormik({
        initialValues: {
            age: '',
            first_name: '',
            second_name: '',
            patronymic: '',
            phone: '',
            email: '',
            country: '',
            city: '',
            is_show: true,
            user: 0,
        },

        onSubmit: values => {
            dispatch(advanceTC({role: 'Parent', data: values})).then(
                () => {
                    return nav(`/profile/Parent/${user}`)
                })

        },
    })
    return (
        <form onSubmit={formik.handleSubmit} className={styles.form}>
            <label className={styles.input_file}>
                <span>+</span>
                <input {...formik.getFieldProps('photo')} type={'file'} className={styles.files} />
            </label>
            <div className={styles.inputs}>
                <input {...formik.getFieldProps('first_name')} placeholder={'Имя'} />
                <input {...formik.getFieldProps('second_name')} placeholder={'Фамилия'} />
                <input {...formik.getFieldProps('patronymic')} placeholder={'Отчество'} />
                <input {...formik.getFieldProps('age')} placeholder={'Возраст'} />
                <input {...formik.getFieldProps('phone')} placeholder={'Телефон'} />
                <input {...formik.getFieldProps('email')} placeholder={'E-mail'} />
                <input {...formik.getFieldProps('country')} placeholder={'Страна'} />
                <input {...formik.getFieldProps('city')} placeholder={'Город'} />
                <label>
                    <input {...formik.getFieldProps('is_show')} type={'checkbox'} />
                    Показывать всем
                </label>
                <button type="submit">Добавить</button>
            </div>
        </form>
    )
}