import React, {useEffect, useState} from 'react';
import ReactPlayer from "react-player";
import {VideoType} from "../../../../api/RequestType";
import {getAPI} from "../../../../api/api";
import {useNavigate} from "react-router";
import styles from "../../../Profile/Profile.module.scss";
import {api} from "../../../../api/api";

export const MyVideo = () => {
    const [video, setVideos] = useState<VideoType[]>()
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
    let videos : any
    if(video) {
        videos = video?.map(vid => {
            return (
                <div className={styles.frame}>
                    <ReactPlayer url={`${vid?.video}`} playing={playing}
                                 width={310}
                                 height={'auto'}
                                 onMouseOver={() => setPlaying(true)}
                                 onMouseOut={() => setPlaying(false)}
                    />
                </div>
            )
        })
    }else {videos = ''}

    return (
        <div className={styles.video}>
            {videos? videos : ''}
        </div>
    );
};
