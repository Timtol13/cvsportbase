import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router'
import {getAPI} from '../../api/api'
import styles from './Profile.module.scss'
import {AdvanceFormType} from "../../api/RequestType";
export const Profile = () => {
    const {role, first_name, second_name, patronymic} = useParams()
    const  [ roleData, setRoleData] = useState<AdvanceFormType>()
    const [image, setImage] = useState()
    const us = localStorage.getItem('app-state')
    const user = JSON.parse(us? us : '').auth.me.username
    useEffect(() => {
        getAPI.getRole(role, first_name, second_name, patronymic).then(e => setRoleData(e.data[0]))
        getAPI.getPhoto(user).then((e) => {setImage(e.data[0])})
    }, [])
    return (
        <div className={styles.container}>
            <img src={`${window.location.origin}${image?.photo}`} alt={'Wait'} />
            <h3>{roleData?.first_name} {roleData?.second_name} {roleData?.patronymic}</h3>
        </div>
    )
}
