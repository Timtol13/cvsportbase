import * as string_decoder from "string_decoder";

export type RegistrationFormType = {
    username: string,
    email: string,
    password: string
    role: string
}
export type AdvancePutFormType = {
    first_name: string,
    second_name: string,
    patronymic: string,
    phone: string,
    email: string,
    country: string,
    city: string,
    is_show: boolean,
    leg?: string,
    height?: string,
    weight?: string,
    shengen?: boolean,
    position?: any,
}
export type AdvanceFormType = {
    first_name: string,
    second_name: string,
    patronymic: string,
    phone: string,
    email: string,
    country: string,
    city: string,
    user: number,
    is_show: boolean,
    leg?: string,
    position?: any,
    age?: string,
    height?: string,
    weight?: string,
    shengen?: boolean,
    description?: string,
    players?: string[],
    country_s?: string,
    city_s?: string,
    phone_s?: string,
    e_mail_s?: string,
    photo_s?: string,
    passport?: string,
    schools?: string[],
    school_ages?: string,
    school?: string,
}

export type VideoType = {
    video?: string,
    user?: RegistrationFormType,
    player?: AdvanceFormType,
    description?: string,
    title?: string,
}