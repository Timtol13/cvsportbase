import React, {ChangeEvent} from 'react';
import styles from './headerStyle.module.scss'
import plus from '../media/plus_circle_outline.svg'
import profile from '../media/profile.svg'
import {addVideoTC, uploadPhotoTC} from "../store/bll/authReducer";
import {useDispatch} from "react-redux";

let user = localStorage.getItem('app-state')

export const Header = () => {
    const dispatch = useDispatch()
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];
            let fd = new FormData()
            fd.append('video', file, file.name)
            fd.append('user', JSON.parse(!user ? '' : user).auth.me.username)
            dispatch(addVideoTC({video: fd ? fd.get('video') : '', user: fd ? fd.get('user') : ''}))
        }
    };
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <div className={styles.CV}>СVSportBase</div>
                <div className={styles.subTitle}>Поиск и продвижение игроков</div>
            </div>
            {/*<div>Поиск</div>*/}
            <div className={styles.icons}>
                <input type="file"
                       accept="video/*"
                       onChange={uploadHandler}
                       className={styles.files}
                       id="button-photo"/>
                <img src={plus} alt=""/>
                <img src={profile} alt=""/>
            </div>
        </div>
    )
}
