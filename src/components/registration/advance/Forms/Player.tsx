import React, {useState} from 'react'
import styles from './Forms.module.scss'
import Select, {OnChangeValue} from 'react-select'
import {useAppDispatch} from "../../../../hooks/hooks"
import {advanceTC} from "../../../../store/bll/authReducer"
import {useFormik} from "formik"
import {useNavigate} from "react-router"
import {authAPI} from "../../../../api/api";
import axios from "axios";

type PositionsType = {
    value: number
    label: string
    isFixed?: boolean
}
let token = sessionStorage.getItem('tokenData');

export const Player = () => {
    const dispatch = useAppDispatch()
    const nav = useNavigate()

    const [leg, setLeg] =  useState('')
    const [position, setPosition] =  useState<PositionsType[]>([])
    const [image, setImage] = useState<any>()
    const api = 'http://127.0.0.1:8000/'

    const positions = [
        {value: 1 , label: "Вратарь"},
        {value: 2 , label: "Центральный защитник"},
        {value: 3 , label: "Левый защитник"},
        {value: 4 , label: "Правый защитник"},
        {value: 5 , label: "Центральный опорный полузащитник"},
        {value: 6 , label: "Центральный полузащитник"},
        {value: 7 , label: "Левый полузащитник"},
        {value: 8 , label: "Правый полузащитник"},
        {value: 9 , label: "Центральный нападающий"},
        {value: 10 , label: "Правый вингер"},
        {value: 11 , label: "Левый вингер"},
        {value: 12 , label: "Инсайдер"},
    ]
    //
    const formik = useFormik({
        initialValues: {
            age: '',
            first_name: '',
            second_name: '',
            patronymic: '',
            height: '',
            weight: '',
            phone: '',
            email: '',
            country: '',
            position: 1,
            shengen: false,
            city: '',
            description: '',
            is_show: false,
            user: 0
        },

        onSubmit: values => {
            dispatch(advanceTC({role: 'Player', data: {...values, leg, position}})).then(() => {
                return nav(`/profile/Player/${values.first_name}/${values.second_name}/${values.patronymic}`)})
        },
    })
    const orderOptions = (values: readonly PositionsType[]) => {
        return values
            .filter((v) => v.isFixed)
            .concat(values.filter((v) => !v.isFixed));
    };
    const onChange = (newValue: OnChangeValue<PositionsType, true>,) => {
        setPosition(orderOptions(newValue));
    };
    return (
        <>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <label className={styles.input_file}>
                    <span>+</span>
                    <input type={'file'} onChange={(e : any) => {
                        const formData = new FormData()
                        formData.append('image', e.target.files[0], e.target.files[0].name)
                        formData.append('token', JSON.parse(token? token : '').access)
                        axios.post(`${api}ProfilePhoto/`, formData).then((res) => {console.log(res)})
                    }
                    } className={styles.files}/>
                </label>
                <div className={styles.inputs}>
                    <input {...formik.getFieldProps('first_name')} placeholder={'Имя'}/>
                    <input {...formik.getFieldProps('second_name')} placeholder={'Фамилия'}/>
                    <input {...formik.getFieldProps('patronymic')} placeholder={'Отчество'}/>
                    <input {...formik.getFieldProps('age')} placeholder={'Возраст'}/>
                    <input {...formik.getFieldProps('height')} placeholder={'Рост'}/>
                    <input {...formik.getFieldProps('weight')} placeholder={'Вес'}/>
                    <input {...formik.getFieldProps('phone')} placeholder={'Телефон'}/>
                    <input {...formik.getFieldProps('email')} placeholder={'E-mail'}/>
                    <input {...formik.getFieldProps('country')} placeholder={'Страна'}/>
                    <input {...formik.getFieldProps('city')} placeholder={'Город'}/>
                    <select onChange={e => setLeg(e.target.value)}>
                        <option value={'R'}>Правая</option>
                        <option value={'L'}>Левая</option>
                        <option value={'B'}>Обе</option>
                    </select>
                    <Select className={styles.select} isMulti options={positions} onChange={onChange}/>
                    <textarea {...formik.getFieldProps('description')} placeholder={"Расскажите о себе"}/>
                    <input {...formik.getFieldProps('shengen')} className={styles.checkbox} type={'checkbox'}/> <i>Наличие
                    шенгена</i>
                    <input {...formik.getFieldProps('is_show')} className={styles.checkbox} type={'checkbox'}/> <i>Отображать
                    всем</i>
                    <button type="submit">Добавить</button>
                </div>
            </form>

        </>
    )
}
