import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router'
import {getAPI} from '../../api/api'
import {MainModal} from '../Modal/MainModal/MainModal'
import './Profile.modul.scss'
import {AdvanceFormType} from "../../api/RequestType";
export const Profile = () => {
    const {role, first_name, second_name, patronymic} = useParams()
    const  [ roleData, setRoleData] = useState<AdvanceFormType>()
    useEffect(() => {
        getAPI.getRole(role, first_name, second_name, patronymic).then(e => setRoleData(e.data))
    }, [])
    return (
        <div className={'container'}>
            <img src={roleData?.photo} className={'profile_photo'}/>
        </div>
    )
}
