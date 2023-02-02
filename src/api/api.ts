import axios from "axios";
import {AdvanceFormType, RegistrationFormType} from "./RequestType";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
})

export const authAPI = {
    registration(data: RegistrationFormType) {
        return instance.post<RegistrationFormType>(`registration/`, data)
    },
    advance(role: string, data: AdvanceFormType) {
        return instance.post<AdvanceFormType>(`advance/${role}`, data)
    },
}

