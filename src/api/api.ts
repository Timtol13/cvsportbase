import axios, {AxiosResponse} from "axios";
import {AdvanceFormType, AdvancePutFormType, RegistrationFormType} from "./RequestType";

let token = localStorage.getItem('app-state')
const api = 'http://127.0.0.1:8000/'
const instance = axios.create({
    baseURL: `${api}api/`,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token ? JSON.parse(token).auth.me.token.access : ''}`
    },
})
const instancePhoto = axios.create({
    baseURL: `${api}`,
    withCredentials: true,
    headers: {
        'Authorization': `Bearer ${token ? JSON.parse(token).auth.me.token.access : ''}`,
        'Content-Type': 'multipart/form-data',
    }
})
const instanceDefault = axios.create({
    baseURL: `${api}`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
})

export const authAPI = {
    registration(data: RegistrationFormType) {
        return instanceDefault.post(`registration/`, data)
    },
    photoUpload(data: {photo: string, user: string}){
        return instancePhoto.post(`api/add/photo/`, data)
    },
    videoUpload(data: {video: string, user: string}){
        return instancePhoto.post(`api/add/video/`, data)
    },
    login(data: { username: string, password: string }) {
        return instanceDefault.post(`${api}login/`, data)
    },
    advance(role: string, data: AdvanceFormType) {
        return instance.post<AdvanceFormType>(`advanced/${role}/`, data)
    },
}
export const getAPI = {
    getRole(role: string | undefined, first_name: string | undefined, second_name: string | undefined, patronymic: string | undefined) {
        return instance.get(`advanced/${role}/?search=${first_name}+${second_name}+${patronymic}`)
    },
    getVideos() {
        return instance.get('add/video/')
    },
    getUserVideos(user : any) {
        return instance.get(`add/video/${user}`)
    },
     getPhoto(user: string){
        return instancePhoto.get(`api/add/photo/${user}/`)
    }
}

export const putAPI = {
    putPhoto(data: {photo: string, user: string}){
        return instancePhoto.put(`api/add/photo/`, data)
    },
    putAdvance(role: string, data: AdvancePutFormType) {
        return instance.put<AdvanceFormType>(`advanced/${role}/`, data)
    },
}

const refreshToken = (token: any) => {
    return fetch(`${api}login/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token,
        }),
    })
        .then((res) => {
            if (res.status === 200) {
                const tokenData = res.json();
                tokenData.then((res) => {
                    sessionStorage.setItem('tokenData', JSON.stringify(res))
                })
                console.log("isLogged")
                return Promise.resolve()
            }
            if (res.status === 400) {
                return console.log("Uncorrect data")
            }
            return Promise.reject();
        });
}

export async function fetchWithAuth(url?: any, options?: any) {
    let tokenData = null
    const loginUrl = '/login';

    if (localStorage.authToken) {
        tokenData = JSON.parse(localStorage.tokenData);
    } else {
        return window.location.replace(loginUrl);
    }

    if (!options.headers) {
        options.headers = {};
    }

    if (tokenData) {
        if (Date.now() >= tokenData.expires_on * 1000) {
            try {
                const newToken = await refreshToken(tokenData.refresh_token);
            } catch (Error) {
                return window.location.replace(loginUrl);
            }
        }

        options.headers.Authorization = `Bearer ${tokenData.token}`; // добавляем токен в headers запроса
    }
    return fetch(url, options);
}

