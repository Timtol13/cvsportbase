import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'

import {requestStatus} from '../../enums/requestStatus'
import {handleError} from '../../utils/handleError'

import {setAppStatus} from './appReducer'

import {authAPI} from '../../api/api'
import {AdvanceFormType, RegistrationFormType} from "../../api/RequestType";

//THUNKS
export const registrationTC = createAsyncThunk(
  'registration',
  async (data: RegistrationFormType, { dispatch }) => {
    dispatch(setAppStatus(requestStatus.LOADING))
    try {
        console.log(data)
      const res = await authAPI.registration(data)
        localStorage.setItem('role', data.role)
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
            console.log(data)
            const res = await authAPI.login(data)
            localStorage.setItem('role', data.role)
            dispatch(setMe(res))
            dispatch(changeLoggedIn(true))
            dispatch(setAppStatus(requestStatus.SUCCEEDED))
        } catch (err) {
            handleError(err, dispatch)
            dispatch(setAppStatus(requestStatus.FAILED))
        }
    }
)

export const uploadPhotoTC = createAsyncThunk(
    'uploadPhoto',
    async (params: {photo: string, user: string}, {dispatch}) => {
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
      email: ''
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
