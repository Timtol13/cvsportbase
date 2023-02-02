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
        <form onSubmit={formik.handleSubmit}>
            <input {...formik.getFieldProps('first_name')}/>
            <input {...formik.getFieldProps('second_name')}/>
            <input {...formik.getFieldProps('patronymic')}/>
            <input {...formik.getFieldProps('age')}/>
            <input {...formik.getFieldProps('height')}/>
            <input {...formik.getFieldProps('weight')}/>
            <input {...formik.getFieldProps('phone')}/>
            <input {...formik.getFieldProps('email')}/>
            <input {...formik.getFieldProps('country')}/>
            <input {...formik.getFieldProps('city')}/>
            <input {...formik.getFieldProps('shengen')}/>
            <button type="submit">Добавить</button>
        </form>
    )
}
