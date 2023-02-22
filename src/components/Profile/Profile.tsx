import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router'
import {getAPI} from '../../api/api'
import {AdvanceFormType} from "../../api/RequestType";
export const Profile = () => {
    const {role, first_name, second_name, patronymic} = useParams()
    const  [ roleData, setRoleData] = useState<AdvanceFormType>()
    useEffect(() => {
        getAPI.getRole(role, first_name, second_name, patronymic).then(e => setRoleData(e.data))
    }, [])
    return (
        <div>
            <h3>{roleData?.first_name} {roleData?.second_name} {roleData?.patronymic}</h3>
        </div>
    )
}
