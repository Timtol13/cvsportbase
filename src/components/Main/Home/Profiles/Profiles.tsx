import React from 'react';
import styles from './Profiles.module.scss';
import {ProfileCard} from "./ProfileCard/ProfileCard";

const profiles = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
]

export const Profiles = () => {
    return (
        <div className={styles.profiles}>
            {profiles.map(profile => {
                return <ProfileCard key={profile.id}/>
            })}
        </div>
    );
};
