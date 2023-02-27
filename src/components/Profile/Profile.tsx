import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router'
import {getAPI, putAPI} from '../../api/api'
import styles from './Profile.module.scss'
import user_circle from '../../media/user/user_circle.svg'
import video from '../../media/user/play_circle_outline.svg'
import photos from '../../media/user/free-icon-photo-camera-748119 2.svg'
import message from '../../media/user/comment.svg'
import settings from '../../media/user/settings.svg'
import {AdvanceFormType} from "../../api/RequestType";
import {useFormik} from "formik";
import {useAppDispatch} from "../../hooks/hooks";
import {advancePutTC} from "../../store/bll/authReducer";
import Select, {OnChangeValue} from "react-select";

type PositionsType = {
    value: number
    label: string
    isFixed?: boolean
}
export const Profile = () => {
    const {role, first_name, second_name, patronymic} = useParams()
    const  [ roleData, setRoleData] = useState<AdvanceFormType>()
    const dispatch = useAppDispatch()
    const [image, setImage] = useState<any>()
    const [position, setPosition] = useState<PositionsType[]>([])
    const [leg, setLeg] = useState('')
    const api = 'http://127.0.0.1:8000'
    const us = localStorage.getItem('app-state')
    const formik = useFormik(
        {
            initialValues: {
                role: role,
                first_name: "",
                second_name: "",
                patronymic: "",
                weight: '',
                height:'',
                age: '',
                country: "",
                city: "",
                email: "",
                phone: "",
                is_show: false,
                shengen: false,
            },

            onSubmit: values => {
                dispatch(advancePutTC({role: 'Player', data: {...values, leg, position}})).then(() => {})
            },
        }
    )
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
    const user = JSON.parse(us? us : '').auth.me.username
    useEffect(() => {
        getAPI.getRole(role, first_name, second_name, patronymic).then(e => setRoleData(e.data[0]))
        getAPI.getPhoto(user).then((e) => {setImage(e.data[0])})
    }, [])
    const orderOptions = (values: readonly PositionsType[]) => {
        return values
            .filter((v) => v.isFixed)
            .concat(values.filter((v) => !v.isFixed));
    };
    const onChange = (newValue: OnChangeValue<PositionsType, true>,) => {
        setPosition(orderOptions(newValue));
    };
    return (
        <div className={styles.container}>
            <nav>
                <ul>
                    <li>
                        <img src={user_circle} /><a>Мой профиль</a>
                    </li>
                    <li>
                        <img src={video} /><a>Мои видео</a>
                    </li>
                    <li>
                        <img src={photos} /><a>Мои фото</a>
                    </li>
                    <li>
                        <img src={message} /><a>Мои сообщения</a>
                    </li>
                    <li>
                        <img src={settings} /><a>Настройки</a>
                    </li>
                </ul>
            </nav>
            <img className={styles.ProfilePhoto} src={`${api}${image?.photo}`} alt={'Wait'}/>
            <form className={styles.Inputs} onSubmit={formik.handleSubmit}>
                <input placeholder={roleData?.first_name} {...formik.getFieldProps('first_name')} />
                <input placeholder={roleData?.second_name} {...formik.getFieldProps('second_name')} />
                <input placeholder={roleData?.patronymic} {...formik.getFieldProps('patronymic')} />
                <input placeholder={roleData?.weight} className={styles.w60} {...formik.getFieldProps('weight')}/>
                <input placeholder={roleData?.height} className={styles.w60} {...formik.getFieldProps('height')}/>
                <input type={'date'} {...formik.getFieldProps('age')} />
                <select placeholder={'Нога'} onChange={e => setLeg(e.target.value)} value={roleData?.leg}>
                    <option>Нога</option>
                    <option value={'R'}>Правая</option>
                    <option value={'L'}>Левая</option>
                    <option value={'B'}>Обе</option>
                </select>
                <input placeholder={roleData?.country} {...formik.getFieldProps('country')} />
                <input placeholder={roleData?.city} {...formik.getFieldProps('city')} />
                <input placeholder={roleData?.email} {...formik.getFieldProps('email')} />
                <input type={'tel'} placeholder={roleData?.phone} {...formik.getFieldProps('phone')} />
                <i>Отображать всем</i><input type={'checkbox'} {...formik.getFieldProps('is_show')} />
                <i>Шенген</i><input type={'checkbox'} {...formik.getFieldProps('shengen')} />
                <div className={styles.label}>
                    <Select className={styles.selectPlayer}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    height: 'revert-layer',
                                    backgroundColor: '',
                                    color: 'white'
                                }),
                            }} isMulti options={positions} onChange={onChange} placeholder={roleData?.position}/>
                </div>
                <button type="submit" >Сохранить</button>
            </form>
        </div>
    )
}
