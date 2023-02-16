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
            <div className={styles.files}>
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
            </div>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <div className={styles.title}>Скаут</div>
                <div className={styles.subTitle}>Введите данные</div>
                <div className={styles.inputs}>
                    <div className={styles.label}>
                        <div className={styles.labelTitle}>Имя</div>
                        <input className={styles.input} {...formik.getFieldProps('first_name')}/>
                    </div>
                    <div className={styles.label}>
                        <div className={styles.labelTitle}>Фамилия</div>
                        <input className={styles.input} {...formik.getFieldProps('second_name')}/>
                    </div>
                    <div className={styles.label}>
                        <div className={styles.labelTitle}>Отчество</div>
                        <input className={styles.input} {...formik.getFieldProps('patronymic')}/>
                    </div>
                    <div className={styles.label}>
                        <div className={styles.labelTitle}>Возраст</div>
                        <input className={styles.input} {...formik.getFieldProps('age')}/>
                    </div>
                    <div className={styles.label}>
                        <div className={styles.labelTitle}>Телефон</div>
                        <input className={styles.input} {...formik.getFieldProps('phone')}/>
                    </div>
                    <div className={styles.label}>
                        <div className={styles.labelTitle}>E-mail</div>
                        <input className={styles.input} {...formik.getFieldProps('email')}/>
                    </div>
                    <div className={styles.label}>
                        <div className={styles.labelTitle}>Страна</div>
                        <input className={styles.input} {...formik.getFieldProps('country')}/>
                    </div>
                    <div className={styles.label}>
                        <div className={styles.labelTitle}>Город</div>
                        <input className={styles.input} {...formik.getFieldProps('city')}/>
                    </div>
                    <div className={styles.label_checkbox}>
                        <input {...formik.getFieldProps('is_show')} type={'checkbox'}/>
                        <div className={styles.assent}>Показывать всем</div>
                    </div>
                </div>
                <div className={styles.info}>
                    <button className={styles.button} type="submit">Добавить</button>
                </div>
            </form>
        </div>
    )
}
