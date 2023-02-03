import styles from './Forms.module.scss'
import {useAppDispatch} from "../../../../hooks/hooks";
import React, {useState} from "react";
import {useFormik} from "formik";
import {advanceTC} from "../../../../store/bll/authReducer";

export const Agent = () => {
    const dispatch = useAppDispatch()
    //
    const [leg, setLeg] =  useState('')
    const [position, setPosition] = useState([""])
    //
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
            user: ''
        },

        onSubmit: values => {
            console.log(position)
            dispatch(advanceTC({role: 'Agent', data: values}))

        },
    })

    return (
        <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.inputs}>
                <input {...formik.getFieldProps('first_name')} placeholder={'Имя'} />
                <input {...formik.getFieldProps('second_name')} placeholder={'Фамилия'} />
                <input {...formik.getFieldProps('patronymic')} placeholder={'Отчество'} />
                <input {...formik.getFieldProps('age')} placeholder={'Возраст'} />
                <input {...formik.getFieldProps('phone')} placeholder={'Телефон'} />
                <input {...formik.getFieldProps('email')} placeholder={'E-mail'} />
                <input {...formik.getFieldProps('country')} placeholder={'Страна'} />
                <input {...formik.getFieldProps('city')} placeholder={'Город'} />
                <input {...formik.getFieldProps('is_show')} checked type={'checkbox'} />Показывать другим
                <button type="submit">Добавить</button>
            </div>
        </form>
    )
}