import React, {useEffect, useState} from 'react';
import {VideoType} from "../../../api/RequestType";
import {getAPI} from "../../../api/api";
import ReactPlayer from "react-player";

export const Home = () => {
    const [videos, setVideos] = useState<VideoType>()

    useEffect(()=> {
        getAPI.getVideos().then(e => {
            setVideos(e.data)
        })
    }, [])
    const [playing, setPlaying] = useState(false)
    return (
        <div>
           <ReactPlayer url={videos?.file}
                        playing={playing}
                        onMouseOver={()=>setPlaying(true)}
                        onMouseOut={()=>setPlaying(false)}
           />
        </div>
    );
};
