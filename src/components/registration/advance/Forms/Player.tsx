import React, {ChangeEvent, useState} from 'react'
import styles from './Forms.module.scss'
import Select, {OnChangeValue} from 'react-select'
import {useAppDispatch} from "../../../../hooks/hooks"
import {advanceTC, uploadPhotoTC} from "../../../../store/bll/authReducer"
import {useFormik} from "formik"
import {useNavigate} from "react-router"

type PositionsType = {
    value: number
    label: string
    isFixed?: boolean
}
let user = localStorage.getItem('username')
const maxFileSize = 1000000;
export const Player = () => {
    const dispatch = useAppDispatch()
    const nav = useNavigate()

    const [leg, setLeg] = useState('')
    const [position, setPosition] = useState<PositionsType[]>([])

    const positions = [
        {value: 1, label: "Вратарь"},
        {value: 2, label: "Центральный защитник"},
        {value: 3, label: "Левый защитник"},
        {value: 4, label: "Правый защитник"},
        {value: 5, label: "Центральный опорный полузащитник"},
        {value: 6, label: "Центральный полузащитник"},
        {value: 7, label: "Левый полузащитник"},
        {value: 8, label: "Правый полузащитник"},
        {value: 9, label: "Центральный нападающий"},
        {value: 10, label: "Правый вингер"},
        {value: 11, label: "Левый вингер"},
        {value: 12, label: "Инсайдер"},
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
                return nav(`/profile/Player/${values.first_name}/${values.second_name}/${values.patronymic}`)
            })
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

    const convertFileToBase64 = (file: File, callBack: (value: string) => void): void => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const file64 = reader.result as string;
            callBack(file64);
        };
        reader.readAsDataURL(file);
    };
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];
            if (file.size < maxFileSize) {
                convertFileToBase64(file, (file64: string) => {
                    dispatch(uploadPhotoTC({photo: file64, user: `${user}`}));
                });
            }
        }
    };

    return (
        <div className={styles.role}>
            <div className={styles.files}>
                <label className={styles.input_file} htmlFor="button-photo">
                    <span>+</span>
                    <input type="file"
                           accept="image/*"
                           onChange={uploadHandler}
                           className={styles.files}
                           id="button-photo"/>
                </label>
            </div>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <div className={styles.title}>Игрок</div>
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
                        <div className={styles.labelTitle}>Рост</div>
                        <input className={styles.input} {...formik.getFieldProps('height')}/>
                    </div>
                    <div className={styles.label}>
                        <div className={styles.labelTitle}>Вес</div>
                        <input className={styles.input} {...formik.getFieldProps('weight')}/>
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
                    <div className={styles.label}>
                        <div className={styles.labelTitle}>Нога</div>
                        <select className={styles.select} onChange={e => setLeg(e.target.value)}>
                            <option value={'R'}>Правая</option>
                            <option value={'L'}>Левая</option>
                            <option value={'B'}>Обе</option>
                        </select>
                    </div>
                    <div className={styles.label}>
                        <div className={styles.labelTitle}>Позиция</div>
                        <Select className={styles.selectPlayer}
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        height: 'revert-layer',
                                        backgroundColor: '',
                                        color: 'white'
                                    }),
                                }} isMulti options={positions} onChange={onChange} placeholder={''}/>
                    </div>
                </div>
                <div className={styles.info}>
                    <textarea className={styles.textarea} {...formik.getFieldProps('description')}
                              placeholder={"Расскажите о себе"}/>
                    <div className={styles.checkbox}>
                        <input {...formik.getFieldProps('shengen')}
                               className={styles.check} type={'checkbox'}/>
                        <div className={styles.assent}>
                            Наличие шенгена
                        </div>
                    </div>
                    <div className={styles.checkbox}>
                        <input {...formik.getFieldProps('is_show')}
                               className={styles.check} type={'checkbox'}/>
                        <div className={styles.assent}>
                            Отображать всем
                        </div>
                    </div>
                    <button type="submit" className={styles.button}>Добавить</button>
                </div>
            </form>
        </div>
    )
}
