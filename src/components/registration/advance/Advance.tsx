import React from 'react'
import {useParams} from "react-router"
import {Player} from "./Forms/Player"
import {Agent} from './Forms/Agent'
import {Trainer} from './Forms/Trainer'
import {Scout} from './Forms/Scout'
import styles from './Advance.module.scss'


export const Advance = () => {
    const {role} = useParams()
    const form = () => {
        switch (role) {
            case 'Player':
                return <Player />
            case 'Agent':
                return <Agent />
            case 'Trainer':
                return <Trainer />
            case 'Scout':
                return <Scout />
        }
    }
    return (
        <div className={styles.container}>
            {form()}
        </div>
    )
}
