import React, {ChangeEvent} from 'react';
import styles from './headerStyle.module.scss'
import plus from '../media/plus_circle_outline.svg'
import profile from '../media/profile.svg'
import {addVideoTC} from "../store/bll/authReducer";
import {useDispatch} from "react-redux";

let user = localStorage.getItem('app-state')

export const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <div className={styles.CV}>СVSportBase</div>
                <div className={styles.subTitle}>Поиск и продвижение игроков</div>
            </div>
            {/*<div>Поиск</div>*/}
            <div className={styles.icons}>

                <img src={plus} alt=""/>
                <img src={profile} alt=""/>
            </div>
        </div>
    )
}
