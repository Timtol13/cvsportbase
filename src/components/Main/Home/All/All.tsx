import React, {useEffect, useState} from 'react'
import {getAPI} from "../../../../api/api";
import {UserPhoto} from "../../../../api/RequestType";
import styles from './All.module.scss'

export const All = () => {
    const [users, setUsers] = useState<UserPhoto[]>()
    useEffect(() => {
        getAPI.getUsersPhoto().then(e => {setUsers(e.data.results)})
    }, [])
    let user: any
    try{
        user = users?.map(user => {
            return(
                <div className={styles.person}>
                    <img src={`${user?.photo}`}/>
                    <a href={`http://localhost:3000/profile/${user?.role}/${user?.user}`}>{user?.user}</a>
                </div>
            )
        })
    } catch (TypeError){user = ''}
    return (
        <div>
            {user? user : ''}
        </div>
    )
}