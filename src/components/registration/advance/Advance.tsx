import React from 'react'
import {useParams} from "react-router";


export const Advance = () => {
    const {role} = useParams()
    return (
        <div>
            {role}
        </div>
    )
}
