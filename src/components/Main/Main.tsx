import React, {useState} from 'react'
import {getAPI} from '../../api/api'
import ReactPlayer from 'react-player'
import {VideoType} from '../../api/RequestType'

export const Main = () => {
    const [videos, setVideos] = useState<VideoType>()
    getAPI.getVideos().then(e => {
        setVideos(e.data)
    })
    return (
        <div>
        </div>
    )
}