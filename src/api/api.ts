import axios from "axios";
import {AdvanceFormType, AdvancePutFormType, RegistrationFormType} from "./RequestType";

let token = localStorage.getItem('app-state')
export const api = 'http://127.0.0.1:8000'
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
        return instanceDefault.post(`/registration/`, data)
    },
    photoUpload(data: {photo: string, user: string}){
        return instancePhoto.post(`/api/add/photo/${data.user}/`, data)
    },
    videoUpload(data: {video: string, user: string}){
        return instancePhoto.post(`/api/add/video/${data.user}/`, data)
    },
    login(data: { username: string, password: string }) {
        return instanceDefault.post(`/login/`, data)
    },
    advance(role: string, data: AdvanceFormType) {
        return instance.post<AdvanceFormType>(`/advanced/${role}/`, data)
    },
}
export const getAPI = {
    getRole(role: string | undefined, user: string | undefined) {
        return instance.get(`/advanced/${role}/?search=${user}`)
    },
    getVideos() {
        return instancePhoto.get('/add/video/')
    },
    getUserVideos(user : string) {
        return instancePhoto.get(`/api/add/video/${user}`)
    },
     getPhoto(user: string){
        return instancePhoto.get(`/api/add/photo/${user}/`)
    },
    getUsersPhoto(){
        return instancePhoto.get(`/api/add/photo/`)
    }
}

export const putAPI = {
    putPhoto(data: {photo: string, user: string}){
        return instancePhoto.put(`/api/add/photo/${data.user}/`, data)
    },
    putAdvance(role: string, data: AdvancePutFormType, user: string) {
        return instance.put<AdvanceFormType>(`/advanced/${role}/${user}/`, data)
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

