import styles from './Forms.module.scss'
import {useAppDispatch} from "../../../../hooks/hooks";
import React from "react";
import {useFormik} from "formik";
import {advanceTC} from "../../../../store/bll/authReducer";
import axios from "axios";

export const Scout = () => {
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
            user: 0,
        },

        onSubmit: values => {
            dispatch(advanceTC({role: 'Scout', data: values}))

        },
    })
    return (
        <div className={styles.role}>
            <label className={styles.input_file}>
                <span>+</span>
                <input type={'file'} onChange={(e: any) => {
                    const formData = new FormData()
                    const api = 'http://127.0.0.1:8000/'
                    let token = sessionStorage.getItem('tokenData');
                    formData.append('image', e.target.files[0], e.target.files[0].name)
                    formData.append('token', JSON.parse(token ? token : '').access)
                    axios.post(`${api}ProfilePhoto/`, formData).then((res) => {
                        console.log(res)
                    })
                }
                } className={styles.files}/>
            </label>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <div className={styles.inputs}>
                    <input {...formik.getFieldProps('first_name')} placeholder={'Имя'}/>
                    <input {...formik.getFieldProps('second_name')} placeholder={'Фамилия'}/>
                    <input {...formik.getFieldProps('patronymic')} placeholder={'Отчество'}/>
                    <input {...formik.getFieldProps('age')} placeholder={'Возраст'}/>
                    <input {...formik.getFieldProps('phone')} placeholder={'Телефон'}/>
                    <input {...formik.getFieldProps('email')} placeholder={'E-mail'}/>
                    <input {...formik.getFieldProps('country')} placeholder={'Страна'}/>
                    <input {...formik.getFieldProps('city')} placeholder={'Город'}/>
                    <label>
                        <input {...formik.getFieldProps('is_show')} type={'checkbox'}/>
                        Показывать всем
                    </label>
                    <button type="submit">Добавить</button>
                </div>
            </form>
        </div>
    )
}
