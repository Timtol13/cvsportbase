import React from 'react'
import {useParams} from "react-router";
import {Player} from "./Forms/Player";
import styles from './Advance.module.scss'


export const Advance = () => {
    const {role} = useParams()
    const form = () => {
        switch (role) {
            case 'Player':
                return <Player/>
        }
    }
    return (
        <div className={styles.container}>
            {form()}
        </div>
    )
}
