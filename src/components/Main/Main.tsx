import React, {useState} from 'react'
import {getAPI} from '../../api/api'
import ReactPlayer from 'react-player'
import {VideoType} from '../../api/RequestType'

export const Main = () => {
    const [videos, setVideos] = useState<VideoType>()
    getAPI.getVideos().then(e => setVideos(e.data[3]))
    return (
        <div>
            <ReactPlayer controls url={videos?.file} />
        </div>
    )
}