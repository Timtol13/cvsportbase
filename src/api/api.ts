import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
})

export const authAPI = {
    registration(data: RegistrationFormType) {
        return instance.post(`registration/`, data)
    },
    login(data: any) {
        return instance.post<any>('user/login', data)
    },
    getMe(params: any) {
        return instance.get<any>('user', { params })
    },
    updateMe(data: any) {
        return instance.put<any>('user/update', { data })
    },
}

export type RegistrationFormType = {
    username: string,
    email: string,
    password: string
}
