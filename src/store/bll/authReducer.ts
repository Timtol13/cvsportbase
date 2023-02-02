import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { requestStatus } from '../../enums/requestStatus'
import { handleError } from '../../utils/handleError'

import { setAppStatus } from './appReducer'

import {authAPI, RegistrationFormType} from '../../api/api'

//THUNKS
export const login = createAsyncThunk(
  'login',
  async (data: { email: string; password: string }, { dispatch }) => {
    dispatch(setAppStatus(requestStatus.LOADING))
    try {
      const res = await authAPI.login(data)

      dispatch(setMe(res.data))
      dispatch(changeLoggedIn(true))
      dispatch(setAppStatus(requestStatus.SUCCEEDED))
    } catch (err) {
      handleError(err, dispatch)
      dispatch(setAppStatus(requestStatus.FAILED))
    }
  }
)
export const registrationTC = createAsyncThunk(
  'registration',
  async (data: RegistrationFormType, { dispatch }) => {
    dispatch(setAppStatus(requestStatus.LOADING))
    try {
      const res = await authAPI.registration(data)
      dispatch(setMe(res.data))
      dispatch(changeLoggedIn(true))
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
