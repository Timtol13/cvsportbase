import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'

import {requestStatus} from '../../enums/requestStatus'
import {handleError} from '../../utils/handleError'

import {setAppStatus} from './appReducer'

import {authAPI, getAPI} from '../../api/api'
import {AdvanceFormType, RegistrationFormType} from "../../api/RequestType";

//THUNKS
export const registrationTC = createAsyncThunk(
  'registration',
  async (data: RegistrationFormType, { dispatch }) => {
    dispatch(setAppStatus(requestStatus.LOADING))
    try {
        console.log(data)
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
export const advanceTC = createAsyncThunk(
  'advance',
  async (params: {role:string, data: AdvanceFormType}, { dispatch }) => {
    dispatch(setAppStatus(requestStatus.LOADING))
    try {
      const res = await authAPI.advance(params.role, params.data)
        dispatch(setMyRole(res.data))
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
      myRole: {
        role: '',
        first_name: '',
        second_name: '',
        patronymic: '',
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
      setMyRole(state, action){
        state.myRole = action.payload
      }
  },
})

export const authReducer = slice.reducer

export const { setMe, changeLoggedIn, setMyRole } = slice.actions
