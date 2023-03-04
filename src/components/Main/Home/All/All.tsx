import React, {useEffect, useState} from 'react'
import {getAPI} from "../../../../api/api";
import {UserPhoto} from "../../../../api/RequestType";

export const All = () => {
    const [users, setUsers] = useState<UserPhoto[]>()
    useEffect(() => {
        getAPI.getUsersPhoto().then(e => {setUsers(e.data)})
    }, [])
    return (
        <div>
            {users? users.map(user => {
                return <h1 color={'#fff'}>{user?.user}</h1>
            }) : ''
            }
        </div>
    )
}