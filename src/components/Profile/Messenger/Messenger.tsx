import React from 'react'
import './Messenger.modul.scss'

export const Messenger = () => {
    let companion = "qwe"
    return (
        <div>
            <a href={`/chat/${companion}`}>
                <div className={"message"}>
                    <h3>Name Surname</h3>
                    <h4>Messenge</h4>
                </div>
            </a>
            <a href={`/chat/${companion}`}>
                <div className={"message"}>
                    <h3>Name Surname</h3>
                    <h4>Messenge</h4>
                </div>
            </a>
        </div>
    )
}