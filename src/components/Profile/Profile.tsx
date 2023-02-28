import React, {useState, useEffect, ChangeEvent} from 'react'
import {useParams} from 'react-router'
import {getAPI, putAPI} from '../../api/api'
import styles from './Profile.module.scss'
import user_circle from '../../media/user/user_circle.svg'
import video from '../../media/user/play_circle_outline.svg'
import photos from '../../media/user/camera.png'
import settings from '../../media/user/settings.svg'
import {AdvanceFormType, VideoType} from "../../api/RequestType";
import {useFormik} from "formik";
import {useAppDispatch} from "../../hooks/hooks";
import {addVideoTC, uploadPhotoTC} from "../../store/bll/authReducer";
import {advancePutTC, putPhotoTC} from "../../store/bll/putReducer";
import Select, {OnChangeValue} from "react-select";
import ReactPlayer from "react-player";

type PositionsType = {
    value: number
    label: string
    isFixed?: boolean
}
const api = 'http://127.0.0.1:8000'

export const Profile = () => {
    const [image, setImage] = useState<any>()
    const dispatch = useAppDispatch()
    const user_storage = localStorage.getItem('app-state')
    const [page, setPage] = useState('profile')
    const user = JSON.parse(user_storage? user_storage : '').auth.me.username
    useEffect(() => {
        getAPI.getPhoto(user).then((e) => {setImage(e.data[0])})
    }, [])
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            if (e.target.files.length) {
                const file = e.target.files[0];
                let fd = new FormData()
                fd.append('photo', file, file.name)
                fd.append('user', user)
                dispatch(putPhotoTC({photo: fd? fd.get('photo') : '', user: fd? fd.get('user') : ''}))
            }
        }
    };
    return (
        <div className={styles.container}>
            <nav>
                <ul>
                    <li>
                        <img src={user_circle} alt={''} /><a onClick={() => {setPage('profile')}}>Мой профиль</a>
                    </li>
                    <li>
                        <img src={video} alt={''} /><a onClick={() => {setPage('video')}}>Видео</a>
                    </li>
                    <li>
                        <img src={photos} width={25} height={25} alt={''} /><a onClick={() => {setPage('photo')}}>Фото</a>
                    </li>
                    {/*<li>*/}
                    {/*    <img src={message} /><a onClick={() => {setPage('messages')}}>Сообщения</a>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <img src={settings} /><a onClick={() => {setPage('settings')}}>Настройки</a>*/}
                    {/*</li>*/}
                </ul>
            </nav>
            { page === 'profile' &&
                <>
                    <div className={styles.ProfilePhoto}>
                        <img src={`${api}${image?.photo}`} alt={'Wait'}/>

                        <div className={styles.files}>
                            <label className={styles.ChangeFile} htmlFor="button-photo">
                                <span>Изменить фото</span>
                                <input type="file"
                                       accept="image/*"
                                       onChange={uploadHandler}
                                       className={styles.files}
                                       id="button-photo"
                                />
                            </label>
                        </div>
                    </div>
                    <MyProfile />
                </>
            }
            {page === 'video' &&
                <div>
                    <MyVideo />
                </div>
            }
            {page === 'photo' &&
                <div>
                    <MyPhotos />
                </div>
            }
            {page === 'messages' &&
                <div>

                </div>
            }
        </div>
    )
}


export const MyProfile = () => {
    const {role, first_name, second_name, patronymic} = useParams()
    const user_storage = localStorage.getItem('app-state')
    const  [ roleData, setRoleData] = useState<AdvanceFormType>()
    const user = JSON.parse(user_storage? user_storage : '').auth.me.username
    useEffect(() => {
        getAPI.getRole(role, first_name, second_name, patronymic).then(e => setRoleData(e.data[0]))
    }, [])

    const dispatch = useAppDispatch()
    const [position, setPosition] = useState<PositionsType[]>([])
    const [leg, setLeg] = useState('')
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
    const orderOptions = (values: readonly PositionsType[]) => {
        return values
            .filter((v) => v.isFixed)
            .concat(values.filter((v) => !v.isFixed));
    };
    const onChange = (newValue: OnChangeValue<PositionsType, true>,) => {
        setPosition(orderOptions(newValue));
    };
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
    let form
    if (role === "Player") {
        form = <form className={styles.Inputs} onSubmit={formik.handleSubmit}>
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
            <button type="submit">Сохранить</button>
        </form>
    }
    else if (role === "Agent"){
        form = <form className={styles.Inputs} onSubmit={formik.handleSubmit}>
            <input placeholder={roleData?.first_name} {...formik.getFieldProps('first_name')} />
            <input placeholder={roleData?.second_name} {...formik.getFieldProps('second_name')} />
            <input placeholder={roleData?.patronymic} {...formik.getFieldProps('patronymic')} />
            <input type={'date'} {...formik.getFieldProps('age')} />
            <input placeholder={roleData?.country} {...formik.getFieldProps('country')} />
            <input placeholder={roleData?.city} {...formik.getFieldProps('city')} />
            <input placeholder={roleData?.email} {...formik.getFieldProps('email')} />
            <input type={'tel'} placeholder={roleData?.phone} {...formik.getFieldProps('phone')} />
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
            <button type="submit">Сохранить</button>
        </form>
    }
    else if (role === "Trainer"){
        form = <form className={styles.Inputs} onSubmit={formik.handleSubmit}>
            <input placeholder={roleData?.first_name} {...formik.getFieldProps('first_name')} />
            <input placeholder={roleData?.second_name} {...formik.getFieldProps('second_name')} />
            <input placeholder={roleData?.patronymic} {...formik.getFieldProps('patronymic')} />
            <input type={'date'} {...formik.getFieldProps('age')} />
            <input placeholder={roleData?.country} {...formik.getFieldProps('country')} />
            <input placeholder={roleData?.city} {...formik.getFieldProps('city')} />
            <input placeholder={roleData?.email} {...formik.getFieldProps('email')} />
            <input type={'tel'} placeholder={roleData?.phone} {...formik.getFieldProps('phone')} />
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
            <button type="submit">Сохранить</button>
        </form>
    }
    else if (role === "Parent"){
        form = <form className={styles.Inputs} onSubmit={formik.handleSubmit}>
            <input placeholder={roleData?.first_name} {...formik.getFieldProps('first_name')} />
            <input placeholder={roleData?.second_name} {...formik.getFieldProps('second_name')} />
            <input placeholder={roleData?.patronymic} {...formik.getFieldProps('patronymic')} />
            <input type={'date'} {...formik.getFieldProps('age')} />
            <input placeholder={roleData?.country} {...formik.getFieldProps('country')} />
            <input placeholder={roleData?.city} {...formik.getFieldProps('city')} />
            <input placeholder={roleData?.email} {...formik.getFieldProps('email')} />
            <input type={'tel'} placeholder={roleData?.phone} {...formik.getFieldProps('phone')} />
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
            <button type="submit">Сохранить</button>
        </form>
    }
    else if (role === "Club"){
        form = <form className={styles.Inputs} onSubmit={formik.handleSubmit}>
            <input placeholder={roleData?.first_name} {...formik.getFieldProps('first_name')} />
            <input placeholder={roleData?.second_name} {...formik.getFieldProps('second_name')} />
            <input placeholder={roleData?.patronymic} {...formik.getFieldProps('patronymic')} />
            <input type={'date'} {...formik.getFieldProps('age')} />
            <input placeholder={roleData?.country} {...formik.getFieldProps('country')} />
            <input placeholder={roleData?.city} {...formik.getFieldProps('city')} />
            <input placeholder={roleData?.email} {...formik.getFieldProps('email')} />
            <input type={'tel'} placeholder={roleData?.phone} {...formik.getFieldProps('phone')} />
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
            <button type="submit">Сохранить</button>
        </form>
    }
    else if (role === "Scout") {
        form = <form className={styles.Inputs} onSubmit={formik.handleSubmit}>
            <input placeholder={roleData?.first_name} {...formik.getFieldProps('first_name')} />
            <input placeholder={roleData?.second_name} {...formik.getFieldProps('second_name')} />
            <input placeholder={roleData?.patronymic} {...formik.getFieldProps('patronymic')} />
            <input type={'date'} {...formik.getFieldProps('age')} />
            <input placeholder={roleData?.country} {...formik.getFieldProps('country')} />
            <input placeholder={roleData?.city} {...formik.getFieldProps('city')} />
            <input placeholder={roleData?.email} {...formik.getFieldProps('email')} />
            <input type={'tel'} placeholder={roleData?.phone} {...formik.getFieldProps('phone')} />
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
            <button type="submit">Сохранить</button>
        </form>
    }
    else {
        form = <>Error</>
    }
    return (
        <>
            {form}
        </>
    )
}

export const MyVideo = () => {
    const user = localStorage.getItem('app-state')
    const dispatch = useAppDispatch()
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            if (e.target.files.length) {
                const file = e.target.files[0];
                let fd = new FormData()
                fd.append('video', file, file.name)
                fd.append('user', JSON.parse(!user ? '' : user).auth.me.username)
                dispatch(addVideoTC({video: fd? fd.get('video') : '', user: fd? fd.get('user') : ''}))
            }
        }
    };
    const [videos, setVideos] = useState<VideoType>()
    const [playing, setPlaying] = useState(false)
    useEffect(() => {
        getAPI.getUserVideos(JSON.parse(!user ? '' : user).auth.me.username).then(e=> {setVideos(e.data)})
    }, [])
    return (
        <>
            <div className={styles.files}>
                { videos &&
                    <ReactPlayer url={videos?.file}
                                 playing={playing}
                                 onMouseOver={()=>setPlaying(true)}
                                 onMouseOut={()=>setPlaying(false)}
                    />
                }
                <label className={styles.input_file} htmlFor="button-video">
                    <span>Добавить видео</span>
                    <input type="file"
                           accept="image/*"
                           onChange={uploadHandler}
                           className={styles.files}
                           id="button-video"/>
                </label>
            </div>
        </>
    )
}

export const MyPhotos = () => {
    const [photos, setPhotos] = useState<any>()
    const user = localStorage.getItem('app-state')
    const dispatch = useAppDispatch()
    useEffect(() => {
        getAPI.getPhoto(JSON.parse(!user ? '' : user).auth.me.username).then(e => {setPhotos(e)})
    }, [])
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            if (e.target.files.length) {
                const file = e.target.files[0];
                let fd = new FormData()
                fd.append('photo', file, file.name)
                fd.append('user', JSON.parse(!user ? '' : user).auth.me.username)
                dispatch(uploadPhotoTC({photo: fd? fd.get('photo') : '', user: fd? fd.get('user') : ''}))
            }
        }
    };
    return (
        <div>
            <img src={`${api}${photos?.photo}`} alt={''}/>
            <div className={styles.files}>
                <label className={styles.input_file} htmlFor="button-photo">
                    <span>Добавить фото</span>
                    <input type="file"
                           accept="image/*"
                           onChange={uploadHandler}
                           className={styles.files}
                           id="button-photo"/>
                </label>
            </div>
        </div>
    )
}