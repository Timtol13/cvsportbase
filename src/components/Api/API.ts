import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
})

export const registrationApi = {
    postRegistration(data: { username: string; email: string; password: string } ) {
        return fetch(`http://127.0.0.1:8000/api/registration/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: data.username, email: data.email, password: data.password})
        }).then(resp => resp.json())
    }

}
export const getUsers = () =>{
    return fetch('http://127.0.0.1:8000/api/registration/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(resp => resp.json())
}