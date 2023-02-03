import React, {useState} from 'react'
import styles from './Forms.module.scss'
import {useAppDispatch} from "../../../../hooks/hooks";
import {advanceTC} from "../../../../store/bll/authReducer";
import {useFormik} from "formik";

export const Player = () => {
    const dispatch = useAppDispatch()
    //
    const [leg, setLeg] =  useState('')
    let position = [""]
    //
    const formik = useFormik({
        initialValues: {
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
            console.log(position)
            dispatch(advanceTC({role: 'Player', data: {...values, leg, position}}))

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
                <select onChange={e => setLeg(e.target.value)}>
                    <option value={'R'}>Правая</option>
                    <option value={'L'}>Левая</option>
                    <option value={'B'}>Обе</option>
                </select>
                <select onChange={e => position.push(e.target.value)}>
                    <option value={"1"}>Вратарь</option>
                    <option value={"2"}>Центральный защитник</option>
                    <option value={"3"}>Левый защитник</option>
                    <option value={"4"}>Правый защитник</option>
                    <option value={"5"}>Центральный опорный полузащитник</option>
                    <option value={"6"}>Центральный полузащитник</option>
                    <option value={"7"}>Левый полузащитник</option>
                    <option value={"8"}>Правый полузащитник</option>
                    <option value={"9"}>Центральный нападающий</option>
                    <option value={"10"}>Правый вингер</option>
                    <option value={"11"}>Левый вингер</option>
                    <option value={"12"}>Инсайдер</option>
                </select>
                <input {...formik.getFieldProps('shengen')} className={styles.checkbox} type={'checkbox'} /> <i>Наличие шенгена</i>
                <button type="submit">Добавить</button>
            </div>
        </form>
    )
}
