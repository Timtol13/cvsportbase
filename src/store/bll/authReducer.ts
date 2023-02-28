import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'

import {requestStatus} from '../../enums/requestStatus'
import {handleError} from '../../utils/handleError'

import {setAppStatus} from './appReducer'

import {authAPI, putAPI} from '../../api/api'
import {AdvanceFormType, AdvancePutFormType, RegistrationFormType} from "../../api/RequestType";

//THUNKS
export const registrationTC = createAsyncThunk(
  'registration',
  async (data: RegistrationFormType, { dispatch }) => {
    dispatch(setAppStatus(requestStatus.LOADING))
    try {
        console.log(data)
      const res = await authAPI.registration(data)
        localStorage.setItem('role', data.role)
        dispatch(loginTC(data))
      dispatch(changeLoggedIn(true))
      dispatch(setAppStatus(requestStatus.SUCCEEDED))

    } catch (err) {
      handleError(err, dispatch)
      dispatch(setAppStatus(requestStatus.FAILED))
    }
  }
)

export const loginTC = createAsyncThunk(
    'login',
    async (data: {username: string, password: string, role: string}, { dispatch }) => {
        dispatch(setAppStatus(requestStatus.LOADING))
        try {
            const res = await authAPI.login(data)
            console.log(res.data)
            dispatch(setMe({id: 0, username: data.username, role: data.role, token: res.data}))
            dispatch(changeLoggedIn(true))
            dispatch(setAppStatus(requestStatus.SUCCEEDED))
        } catch (err) {
            handleError(err, dispatch)
            dispatch(setAppStatus(requestStatus.FAILED))
        }
    }
)



export const addVideoTC = createAsyncThunk(
    'uploadVideo',
    async (params: {video: any, user: any}, {dispatch}) => {
        dispatch(setAppStatus(requestStatus.LOADING))
        try{
            const res = await authAPI.videoUpload({video: params.video, user: params.user, description: null, title: null})
            dispatch(setAppStatus(requestStatus.SUCCEEDED))
        } catch (err) {
            handleError(err, dispatch)
            dispatch(setAppStatus(requestStatus.FAILED))
        }
    }
)

export const uploadPhotoTC = createAsyncThunk(
    'uploadPhoto',
    async (params: {photo: any, user: any}, {dispatch}) => {
        dispatch(setAppStatus(requestStatus.LOADING))
        try {
            const res = await authAPI.photoUpload({photo: params.photo, user: params.user})
            dispatch(setAppStatus(requestStatus.SUCCEEDED))
        } catch (err) {
            handleError(err, dispatch)
            dispatch(setAppStatus(requestStatus.FAILED))
        }
}
)

export const  advanceTC = createAsyncThunk(
  'advance',
  async (params: {role:string, data: AdvanceFormType}, { dispatch }) => {
    dispatch(setAppStatus(requestStatus.LOADING))
    try {
        console.log(params.data)
      const res = await authAPI.advance(params.role, params.data)
        localStorage.setItem('user', '')
      dispatch(setAppStatus(requestStatus.SUCCEEDED))
    } catch (err) {
      handleError(err, dispatch)
      dispatch(setAppStatus(requestStatus.FAILED))
    }
  }
)

const slice = createSlice({
  name: 'me',
  initialState: {
    me: {
      id: 1,
      username: '',
      email: '',
        token: ''
    },
    lng: 'ru',
    isLoggedIn: false,
  },
  reducers: {
    changeLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    setMe(state, action) {
      state.me = action.payload
    },
  },
})

export const authReducer = slice.reducer

export const { setMe, changeLoggedIn } = slice.actions
