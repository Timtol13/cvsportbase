import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'

import {requestStatus} from '../../enums/requestStatus'
import {handleError} from '../../utils/handleError'

import {setAppStatus} from './appReducer'

import {putAPI} from '../../api/api'
import { AdvancePutFormType} from "../../api/RequestType";

export const advancePutTC = createAsyncThunk(
    'advancePut',
    async (params: {role:string, data: AdvancePutFormType}, { dispatch }) => {
        dispatch(setAppStatus(requestStatus.LOADING))
        try {
            console.log(params.data)
            const res = await putAPI.putAdvance(params.role, params.data)
            localStorage.setItem('user', '')
            dispatch(setAppStatus(requestStatus.SUCCEEDED))
        } catch (err) {
            handleError(err, dispatch)
            dispatch(setAppStatus(requestStatus.FAILED))
        }
    }
)