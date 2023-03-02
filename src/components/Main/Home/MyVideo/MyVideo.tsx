import React, {useEffect, useState} from 'react';
import ReactPlayer from "react-player";
import {VideoType} from "../../../../api/RequestType";
import {getAPI} from "../../../../api/api";
import {useNavigate} from "react-router";

export const MyVideo = () => {
    const [videos, setVideos] = useState<VideoType>()
    const nav = useNavigate()

    useEffect(()=> {
        getAPI.getVideos().then(e => {
            setVideos(e.data)
        }).catch( e => {
                if (e.status === 401) {
                    return nav('/login')
                }
            }
        )
    }, [])
    const [playing, setPlaying] = useState(false)
    return (
        <div>
            <ReactPlayer url={videos?.video}
                         playing={playing}
                         onMouseOver={()=>setPlaying(true)}
                         onMouseOut={()=>setPlaying(false)}
            />
        </div>
    );
};
