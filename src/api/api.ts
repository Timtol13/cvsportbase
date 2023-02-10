import axios from "axios";
import {AdvanceFormType, RegistrationFormType} from "./RequestType";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
})
export const authAPI = {
    registration(data: RegistrationFormType) {
        return instance.post<RegistrationFormType>(`token/`, data)
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

