import axios from "axios";
import {AdvanceFormType, RegistrationFormType} from "./RequestType";
import {useNavigate} from "react-router";

let token = sessionStorage.getItem('tokenData')
const api = 'http://127.0.0.1:8000/'

const instance = axios.create({
    baseURL: `${api}api/`,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authentication': token
    },
})
export const authAPI = {
    registration(data: RegistrationFormType) {
        return fetch(`${api}registration/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(() => {
        return fetch(`${api}login/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        ).then(((res) => {
            if (res.status === 200) {
                sessionStorage.setItem('tokenData', JSON.stringify(JSON.stringify(res.json())));
                return Promise.resolve()
            }
            return Promise.reject()
        }))})},
    login(data: {username: string, password: string}){
        return fetch(`${api}login/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(((res) => {
                    if (res.status === 200) {
                        const tokenData = res.json();
                        sessionStorage.setItem('tokenData', JSON.stringify(JSON.stringify(tokenData)));
                        return Promise.resolve()
                    }
                    if(res.status === 400){
                        return console.log("Uncorrect data") }
                    return Promise.reject();
                }
            )
        )
    },
    advance(role: string, data: AdvanceFormType) {
        return instance.post<AdvanceFormType>(`advanced/${role}/`, data)
    },

}
export const getAPI = {
    getRole(role: string | undefined, first_name: string | undefined, second_name: string | undefined, patronymic: string | undefined){
        return instance.get(`advanced/${role}/?search=${first_name}+${second_name}+${patronymic}`)
    },
    getVideos(){
        return instance.get('add/video/')
    }
}
function saveToken(token : any) {
    sessionStorage.setItem('tokenData', JSON.stringify(token));
}
const refreshToken = (token : any) => {
    return fetch('api/refreshToken', {
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
                saveToken(JSON.stringify(tokenData)); // сохраняем полученный обновленный токен в sessionStorage, с помощью функции, заданной ранее
                return Promise.resolve();
            }
            return Promise.reject();
        });
}
export async function fetchWithAuth(url? : any, options? : any) {
    let tokenData = null
    const loginUrl = '/login'; // url страницы для авторизации

    if (sessionStorage.authToken) { // если в sessionStorage присутствует tokenData, то берем её
        tokenData = JSON.parse(localStorage.tokenData);
    } else {
        return window.location.replace(loginUrl); // если токен отсутствует, то перенаправляем пользователя на страницу авторизации
    }

    if (!options.headers) { // если в запросе отсутствует headers, то задаем их
        options.headers = {};
    }

    if (tokenData) {
        if (Date.now() >= tokenData.expires_on * 1000) { // проверяем не истек ли срок жизни токена
            try {
                const newToken = await refreshToken(tokenData.refresh_token); // если истек, то обновляем токен с помощью refresh_token
                saveToken(newToken);
            } catch (Error) { // если тут что-то пошло не так, то перенаправляем пользователя на страницу авторизации
                return window.location.replace(loginUrl);
            }
        }

        options.headers.Authorization = `Bearer ${tokenData.token}`; // добавляем токен в headers запроса
    }
    return fetch(url, options);
}

