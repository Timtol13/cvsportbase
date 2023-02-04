import styles from './Forms.module.scss'
import {useAppDispatch} from "../../../../hooks/hooks";
import React, {useState} from "react";
import {useFormik} from "formik";
import {advanceTC} from "../../../../store/bll/authReducer";

export const Trainer = () => {
    const dispatch = useAppDispatch()
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
            photo: '',
            user: '',
            country_s: '',
            city_s: '',
            phone_s: '',
            e_mail_s: '',
            photo_s: ''
        },

        onSubmit: values => {
            dispatch(advanceTC({role: 'Trainer', data: values}))

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
                <input {...formik.getFieldProps('phone_s')} placeholder={'Телефон школы'} />
                <input {...formik.getFieldProps('email_s')} placeholder={'E-mail школы'} />
                <input {...formik.getFieldProps('country_s')} placeholder={'Страна, в которой находиться школа'} />
                <input {...formik.getFieldProps('city_s')} placeholder={'Город, в котором находиться школа'} />
                <label>
                    <input {...formik.getFieldProps('is_show')} type={'checkbox'} />
                    Показывать всем
                </label>
                <label className={styles.input_file}>
                    <span>Фото школы<br />+</span>
                    <input {...formik.getFieldProps('photo')} type={'file'} className={styles.files} />
                </label>
                <button type="submit">Добавить</button>
            </div>
        </form>
    )
}