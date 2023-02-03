import React from 'react'
import styles from './Forms.module.scss'
import {useAppDispatch} from "../../../../hooks/hooks";
import {advanceTC} from "../../../../store/bll/authReducer";
import {useFormik} from "formik";

export const Player = () => {
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            leg: '',
            position: '',
            age: '',
            first_name: '',
            second_name: '',
            patronimyc: '',
            height: '',
            weight: '',
            phone: '',
            email: '',
            country: '',
            shengen: false,
            city: '',
            description: '',
            is_show: false,
            photo: '',
            user: ''
        },

        onSubmit: values => {
            dispatch(advanceTC({role: 'Player', data: values}))
        },
    })

    return (
        <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.inputs}>
                <input {...formik.getFieldProps('first_name')} placeholder={'Имя'} />
                <input {...formik.getFieldProps('second_name')} placeholder={'Фамилия'} />
                <input {...formik.getFieldProps('patronymic')} placeholder={'Отчество'} />
                <input {...formik.getFieldProps('age')} placeholder={'Возраст'} />
                <input {...formik.getFieldProps('height')} placeholder={'Рост'} />
                <input {...formik.getFieldProps('weight')} placeholder={'Вес'} />
                <input {...formik.getFieldProps('phone')} placeholder={'Телефон'} />
                <input {...formik.getFieldProps('email')} placeholder={'E-mail'} />
                <input {...formik.getFieldProps('country')} placeholder={'Страна'} />
                <input {...formik.getFieldProps('city')} placeholder={'Город'} />
                <input {...formik.getFieldProps('shengen')} className={styles.checkbox} type={'checkbox'} /> <i>Наличие шенгена</i>
                <button type="submit">Добавить</button>
            </div>
        </form>
    )
}
