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
export const getRoleTC = createAsyncThunk(
    'getRole',
    async(data: {role: string, first_name: string, second_name: string, patronymic: string}, {dispatch}) =>{
        dispatch(setAppStatus(requestStatus.LOADING))
        try {
            const res = await getAPI.getRole(data.role, data.first_name, data.second_name, data.patronymic)
            dispatch(setAppStatus(requestStatus.SUCCEEDED))
        }catch(err){
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
